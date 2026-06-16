// src/app/core/services/clima.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ClimaData {
  temperatura: number;
  sensacion: number;
  humedad: number;
  viento: number;
  clima: string;
  icono: string;
  pronostico: any[];
}

export interface CiudadClima {
  nombre: string;
  lat: number;
  lon: number;
  clima: ClimaData | null;
  cargando: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private ciudadesSubject = new BehaviorSubject<CiudadClima[]>([]);
  public ciudades$ = this.ciudadesSubject.asObservable();

  private ciudadActualSubject = new BehaviorSubject<string>('Talca');
  public ciudadActual$ = this.ciudadActualSubject.asObservable();

  private readonly CIUDADES: CiudadClima[] = [
    { nombre: 'Talca', lat: -35.4264, lon: -71.6554, clima: null, cargando: false },
    { nombre: 'Curicó', lat: -34.9853, lon: -71.2394, clima: null, cargando: false },
    { nombre: 'San Clemente', lat: -35.5383, lon: -71.4877, clima: null, cargando: false },
    { nombre: 'Teno', lat: -34.8714, lon: -71.1760, clima: null, cargando: false },
    { nombre: 'Licantén', lat: -34.9840, lon: -72.0050, clima: null, cargando: false },
    { nombre: 'Romeral', lat: -35.4891, lon: -70.8291, clima: null, cargando: false },
    { nombre: 'Constitución', lat: -35.3310, lon: -72.4110, clima: null, cargando: false },
    { nombre: 'Molina', lat: -35.1143, lon: -71.2817, clima: null, cargando: false },
    { nombre: 'Río Claro', lat: -35.2650, lon: -71.2660, clima: null, cargando: false }
  ];

  constructor(private http: HttpClient) {
    this.ciudadesSubject.next(this.CIUDADES);
    this.cargarClimaTodas();
  }

  cambiarCiudad(nombre: string): void {
    this.ciudadActualSubject.next(nombre);
  }

  getCiudadActual(): string {
    return this.ciudadActualSubject.value;
  }

  private cargarClimaTodas(): void {
    const ciudades = this.ciudadesSubject.value;
    ciudades.forEach((ciudad, index) => {
      this.obtenerClimaCiudad(ciudad.lat, ciudad.lon).subscribe({
        next: (data) => {
          const updated = [...this.ciudadesSubject.value];
          updated[index] = { ...ciudad, clima: data, cargando: false };
          this.ciudadesSubject.next(updated);
        },
        error: (err) => {
          console.error(`Error clima para ${ciudad.nombre}:`, err);
          const updated = [...this.ciudadesSubject.value];
          updated[index] = { ...ciudad, cargando: false, error: 'Error al cargar' };
          this.ciudadesSubject.next(updated);
        }
      });
    });
  }

  private obtenerClimaCiudad(lat: number, lon: number): Observable<ClimaData> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=America/Santiago&forecast_days=3`;

    return this.http.get<any>(url).pipe(
      map(data => {
        const current = data.current_weather || {};
        const hourly = data.hourly || {};
        const daily = data.daily || {};

        const temp = current.temperature || 0;
        const humedadIndex = 0;
        const humedad = hourly.relativehumidity_2m?.[humedadIndex] || 70;
        const viento = current.windspeed || 0;
        const weatherCode = current.weathercode || 0;
        const sensacion = this.calcularSensacionTermica(temp, viento, humedad);

        return {
          temperatura: Math.round(temp),
          sensacion: Math.round(sensacion),
          humedad: Math.round(humedad),
          viento: Math.round(viento),
          clima: this.determinarClima(weatherCode),
          icono: this.getIconoClima(weatherCode),
          pronostico: this.procesarPronostico(daily)
        };
      }),
      catchError((error) => {
        console.error('Error en API clima:', error);
        return of(this.getMockClima());
      })
    );
  }

  private calcularSensacionTermica(temp: number, viento: number, humedad: number): number {
    let sensacion = temp;

    if (temp < 10 && viento > 5) {
      sensacion = 13.12 + 0.6215 * temp - 11.37 * Math.pow(viento, 0.16) + 0.3965 * temp * Math.pow(viento, 0.16);
    }

    if (temp > 26 && humedad > 40) {
      const hi = -42.379 + 2.04901523 * temp + 10.14333127 * humedad - 0.22475541 * temp * humedad - 0.00683783 * temp * temp - 0.05481717 * humedad * humedad + 0.00122874 * temp * temp * humedad + 0.00085282 * temp * humedad * humedad - 0.00000199 * temp * temp * humedad * humedad;
      sensacion = hi;
    }

    return Math.max(sensacion, temp - 10);
  }

  private getIconoClima(codigo: number): string {
    const iconos: { [key: number]: string } = {
      0: 'wb_sunny',
      1: 'wb_sunny',
      2: 'wb_cloudy',
      3: 'cloud',
      45: 'foggy',
      48: 'foggy',
      51: 'grain',
      53: 'grain',
      55: 'grain',
      61: 'rainy',
      63: 'rainy',
      65: 'rainy',
      71: 'ac_unit',
      73: 'ac_unit',
      75: 'ac_unit',
      80: 'rainy',
      81: 'rainy',
      82: 'rainy',
      95: 'thunderstorm',
      96: 'thunderstorm',
      99: 'thunderstorm'
    };
    return iconos[codigo] || 'wb_sunny';
  }

  private procesarPronostico(daily: any): any[] {
    if (!daily || !daily.time) return [];

    const pronostico = [];
    const dias = daily.time || [];
    const maxTemp = daily.temperature_2m_max || [];
    const minTemp = daily.temperature_2m_min || [];
    const weatherCodes = daily.weathercode || [];

    for (let i = 0; i < Math.min(dias.length, 3); i++) {
      pronostico.push({
        fecha: dias[i],
        tempMax: Math.round(maxTemp[i] || 0),
        tempMin: Math.round(minTemp[i] || 0),
        clima: this.determinarClima(weatherCodes[i] || 0),
        icono: this.getIconoClima(weatherCodes[i] || 0)
      });
    }
    return pronostico;
  }

  private getMockClima(): ClimaData {
    return {
      temperatura: 22,
      sensacion: 21,
      humedad: 65,
      viento: 12,
      clima: 'Parcialmente nublado',
      icono: 'wb_cloudy',
      pronostico: []
    };
  }

  private determinarClima(codigo: number): string {
    const climas: { [key: number]: string } = {
      0: 'Despejado',
      1: 'Mayormente despejado',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Niebla',
      48: 'Niebla con escarcha',
      51: 'Llovizna ligera',
      53: 'Llovizna moderada',
      55: 'Llovizna densa',
      61: 'Lluvia ligera',
      63: 'Lluvia moderada',
      65: 'Lluvia intensa',
      71: 'Nieve ligera',
      73: 'Nieve moderada',
      75: 'Nieve intensa',
      80: 'Chubascos ligeros',
      81: 'Chubascos moderados',
      82: 'Chubascos intensos',
      95: 'Tormenta',
      96: 'Tormenta con granizo',
      99: 'Tormenta fuerte con granizo'
    };
    return climas[codigo] || 'Variable';
  }
}

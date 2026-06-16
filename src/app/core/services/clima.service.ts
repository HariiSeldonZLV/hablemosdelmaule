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
  pronostico: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private climaSubject = new BehaviorSubject<ClimaData | null>(null);
  public clima$ = this.climaSubject.asObservable();

  private readonly LAT = -35.4264;
  private readonly LON = -71.6554;

  constructor(private http: HttpClient) {}

  actualizarClima(): void {
    this.obtenerClima().subscribe({
      next: (data) => this.climaSubject.next(data),
      error: (err) => {
        console.error('Error clima:', err);
        this.climaSubject.next(this.getMockClima());
      }
    });
  }

  private obtenerClima(): Observable<ClimaData> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.LAT}&longitude=${this.LON}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&timezone=America/Santiago`;

    return this.http.get<any>(url).pipe(
      map(data => ({
        temperatura: data.current_weather?.temperature || 0,
        sensacion: data.current_weather?.temperature || 0,
        humedad: data.hourly?.relativehumidity_2m?.[0] || 70,
        viento: data.current_weather?.windspeed || 0,
        clima: this.determinarClima(data.current_weather?.weathercode),
        pronostico: data.daily || []
      })),
      catchError(() => of(this.getMockClima()))
    );
  }

  private getMockClima(): ClimaData {
    return {
      temperatura: 22,
      sensacion: 21,
      humedad: 65,
      viento: 12,
      clima: 'Parcialmente nublado',
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
      51: 'Llovizna',
      61: 'Lluvia',
      71: 'Nieve',
      95: 'Tormenta'
    };
    return climas[codigo] || 'Variable';
  }
}

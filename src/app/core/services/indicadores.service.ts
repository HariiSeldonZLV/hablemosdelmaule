// src/app/core/services/indicadores.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface IndicadoresEconomicos {
  dolar: number;
  uf: number;
  utm: number;
  euro: number;
  ipc: number;
  actualizado: string;
}

export interface CommodityAgricola {
  nombre: string;
  precio: number;
  unidad: string;
  variacion: number;
  icono: string;
}

export interface DatosCommodities {
  commodities: CommodityAgricola[];
  actualizado: string;
}

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  private indicadoresSubject = new BehaviorSubject<IndicadoresEconomicos | null>(null);
  public indicadores$ = this.indicadoresSubject.asObservable();

  private commoditiesSubject = new BehaviorSubject<DatosCommodities | null>(null);
  public commodities$ = this.commoditiesSubject.asObservable();

  constructor(private http: HttpClient) {}

  actualizarIndicadores(): void {
    this.obtenerIndicadores().subscribe({
      next: (data) => this.indicadoresSubject.next(data),
      error: (err) => {
        console.error('Error al obtener indicadores:', err);
        this.indicadoresSubject.next(this.getMockData());
      }
    });
  }

  actualizarCommodities(): void {
    this.obtenerCommodities().subscribe({
      next: (data) => this.commoditiesSubject.next(data),
      error: (err) => {
        console.error('Error al obtener commodities:', err);
        this.commoditiesSubject.next(this.getMockCommodities());
      }
    });
  }

  private obtenerIndicadores(): Observable<IndicadoresEconomicos> {
    return this.http.get<any>('https://mindicador.cl/api').pipe(
      map(data => ({
        dolar: data.dolar?.valor || 0,
        uf: data.uf?.valor || 0,
        utm: data.utm?.valor || 0,
        euro: data.euro?.valor || 0,
        ipc: data.ipc?.valor || 0,
        actualizado: data.fecha
      })),
      catchError(() => of(this.getMockData()))
    );
  }

  private obtenerCommodities(): Observable<DatosCommodities> {
    // Por ahora usamos datos simulados
    return of(this.getMockCommodities());
  }

  private getMockData(): IndicadoresEconomicos {
    return {
      dolar: 950,
      uf: 37000,
      utm: 65000,
      euro: 1020,
      ipc: 0.2,
      actualizado: new Date().toISOString()
    };
  }

  private getMockCommodities(): DatosCommodities {
    return {
      commodities: [
        {
          nombre: 'Trigo',
          precio: 280,
          unidad: 'USD/ton',
          variacion: 1.2,
          icono: 'grass'
        },
        {
          nombre: 'Maíz',
          precio: 220,
          unidad: 'USD/ton',
          variacion: -0.8,
          icono: 'grass'
        },
        {
          nombre: 'Uva',
          precio: 450,
          unidad: 'USD/ton',
          variacion: 2.5,
          icono: 'local_florist'
        },
        {
          nombre: 'Manzana',
          precio: 380,
          unidad: 'USD/ton',
          variacion: 0.5,
          icono: 'local_florist'
        },
        {
          nombre: 'Tomate',
          precio: 120,
          unidad: 'USD/ton',
          variacion: -1.5,
          icono: 'restaurant'
        },
        {
          nombre: 'Leche',
          precio: 0.45,
          unidad: 'USD/litro',
          variacion: 0.3,
          icono: 'local_drink'
        }
      ],
      actualizado: new Date().toISOString()
    };
  }
}

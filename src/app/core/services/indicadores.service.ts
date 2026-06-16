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

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  private indicadoresSubject = new BehaviorSubject<IndicadoresEconomicos | null>(null);
  public indicadores$ = this.indicadoresSubject.asObservable();

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
}

// src/app/shared/components/clima-widget/clima-widget.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClimaService, CiudadClima } from '../../../core/services/clima.service';

@Component({
  selector: 'app-clima-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="clima-card">
      <mat-card-header>
        <mat-icon>wb_sunny</mat-icon>
        <mat-card-title>Clima en la Región</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <!-- Navegación con flechas -->
        <div class="nav-container">
          <button
            class="nav-btn nav-btn-left"
            (click)="ciudadAnterior()"
            [disabled]="esPrimeraCiudad()">
            <mat-icon>chevron_left</mat-icon>
          </button>

          <div class="ciudad-nombre">
            {{ getCiudadActual()?.nombre || 'Cargando...' }}
          </div>

          <button
            class="nav-btn nav-btn-right"
            (click)="ciudadSiguiente()"
            [disabled]="esUltimaCiudad()">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>

        <!-- Clima actual de la ciudad seleccionada -->
        <ng-container *ngIf="getCiudadActual() as ciudad">
          <div *ngIf="ciudad.cargando" class="loading">
            Cargando clima...
          </div>
          <div *ngIf="ciudad.error" class="error">
            {{ ciudad.error }}
          </div>
          <ng-container *ngIf="ciudad.clima as clima">
            <div class="temperatura">
              {{ clima.temperatura }}°C
            </div>
            <div class="sensacion">
              Sensación: {{ clima.sensacion }}°C
            </div>
            <div class="detalles">
              <div class="detalle">
                <mat-icon>opacity</mat-icon>
                <span>Humedad: {{ clima.humedad }}%</span>
              </div>
              <div class="detalle">
                <mat-icon>air</mat-icon>
                <span>Viento: {{ clima.viento }} km/h</span>
              </div>
            </div>
            <div class="clima-descripcion">
              <mat-icon class="clima-icono">{{ clima.icono }}</mat-icon>
              {{ clima.clima }}
            </div>

            <div class="pronostico" *ngIf="clima.pronostico && clima.pronostico.length > 0">
              <div class="pronostico-item" *ngFor="let dia of clima.pronostico">
                <span class="dia">{{ dia.fecha | date:'EEEE' | slice:0:3 }}</span>
                <mat-icon class="pronostico-icono">{{ dia.icono || 'wb_sunny' }}</mat-icon>
                <span class="temp">{{ dia.tempMin }}° / {{ dia.tempMax }}°</span>
              </div>
            </div>
          </ng-container>
        </ng-container>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .clima-card {
      background: #cc0000;
      color: white;
      border-radius: 0;
      box-shadow: none;
      border: 1px solid #b30000;
    }

    .clima-card .mat-card-header {
      background: #b30000;
      padding: 12px 16px;
      margin: -16px -16px 0 -16px;
      border-bottom: 2px solid #990000;
      border-radius: 0;
    }

    .clima-card .mat-card-title {
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .clima-card .mat-card-header .mat-icon {
      color: #ffcc00;
      margin-right: 8px;
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
    }

    .clima-card .mat-card-content {
      padding: 16px;
    }

    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding: 0 4px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 12px;
    }

    .ciudad-nombre {
      font-size: 1.1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-align: center;
      flex: 1;
    }

    .nav-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      cursor: pointer;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      padding: 0;
      font-family: inherit;
    }

    .nav-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.05);
    }

    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .nav-btn .mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }

    .temperatura {
      font-size: 3.5rem;
      font-weight: 900;
      text-align: center;
      margin: 0.5rem 0;
      letter-spacing: -2px;
    }

    .sensacion {
      text-align: center;
      font-size: 0.9rem;
      opacity: 0.9;
      margin-bottom: 1rem;
    }

    .detalles {
      display: flex;
      justify-content: space-around;
      margin: 1rem 0;
      padding: 0.75rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .detalle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }

    .detalle .mat-icon {
      color: #ffcc00;
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
    }

    .clima-descripcion {
      text-align: center;
      margin-top: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .clima-icono {
      color: #ffcc00;
      font-size: 1.8rem;
      width: 1.8rem;
      height: 1.8rem;
    }

    .pronostico {
      display: flex;
      justify-content: space-around;
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .pronostico-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      min-width: 50px;
    }

    .pronostico-item .dia {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 0.7rem;
      letter-spacing: 0.5px;
    }

    .pronostico-icono {
      color: #ffcc00;
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
    }

    .pronostico-item .temp {
      font-size: 0.7rem;
      font-weight: 600;
    }

    .loading {
      text-align: center;
      padding: 1.5rem;
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .error {
      text-align: center;
      padding: 1.5rem;
      font-size: 0.9rem;
      color: #ffcc00;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .nav-container {
        flex-wrap: wrap;
        gap: 8px;
      }

      .ciudad-nombre {
        font-size: 0.9rem;
        order: 0;
        flex-basis: 100%;
        margin: 4px 0;
      }

      .nav-btn-left {
        order: 1;
      }

      .nav-btn-right {
        order: 2;
      }
    }
  `]
})
export class ClimaWidgetComponent implements OnInit {
  climaService = inject(ClimaService);
  private indiceActual = 0;
  private ciudades: CiudadClima[] = [];

  ngOnInit() {
    // Suscribirse al observable de ciudades
    this.climaService.ciudades$.subscribe(ciudades => {
      this.ciudades = ciudades;
      // Si hay ciudades, asegurar que el índice sea válido
      if (this.ciudades.length > 0 && this.indiceActual >= this.ciudades.length) {
        this.indiceActual = this.ciudades.length - 1;
      }
    });
  }

  getCiudadActual(): CiudadClima | null {
    if (this.ciudades.length === 0) return null;
    return this.ciudades[this.indiceActual] || null;
  }

  ciudadSiguiente(): void {
    if (this.indiceActual < this.ciudades.length - 1) {
      this.indiceActual++;
      // Actualizar la ciudad actual en el servicio
      const ciudad = this.getCiudadActual();
      if (ciudad) {
        this.climaService.cambiarCiudad(ciudad.nombre);
      }
    }
  }

  ciudadAnterior(): void {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      const ciudad = this.getCiudadActual();
      if (ciudad) {
        this.climaService.cambiarCiudad(ciudad.nombre);
      }
    }
  }

  esPrimeraCiudad(): boolean {
    return this.indiceActual === 0 || this.ciudades.length === 0;
  }

  esUltimaCiudad(): boolean {
    return this.indiceActual === this.ciudades.length - 1 || this.ciudades.length === 0;
  }
}

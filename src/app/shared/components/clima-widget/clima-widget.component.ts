// src/app/shared/components/clima-widget/clima-widget.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ClimaService } from '../../../core/services/clima.service';

@Component({
  selector: 'app-clima-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="clima-card">
      <mat-card-header>
        <mat-icon>wb_sunny</mat-icon>
        <mat-card-title>Clima en Talca</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <ng-container *ngIf="clima$ | async as clima; else loading">
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
            {{ clima.clima }}
          </div>
        </ng-container>
        <ng-template #loading>
          <div class="loading">Cargando clima...</div>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .clima-card {
      background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
      color: white;
    }
    .temperatura {
      font-size: 3rem;
      font-weight: bold;
      text-align: center;
      margin: 1rem 0;
    }
    .sensacion {
      text-align: center;
      margin-bottom: 1rem;
    }
    .detalles {
      display: flex;
      justify-content: space-around;
      margin: 1rem 0;
    }
    .detalle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .clima-descripcion {
      text-align: center;
      margin-top: 1rem;
      font-weight: bold;
    }
    .loading {
      text-align: center;
      padding: 1rem;
    }
  `]
})
export class ClimaWidgetComponent implements OnInit {
  climaService = inject(ClimaService);
  clima$ = this.climaService.clima$;

  ngOnInit() {
    this.climaService.actualizarClima();
  }
}

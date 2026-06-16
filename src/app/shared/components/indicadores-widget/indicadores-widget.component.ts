// src/app/shared/components/indicadores-widget/indicadores-widget.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IndicadoresService } from '../../../core/services/indicadores.service';

@Component({
  selector: 'app-indicadores-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="indicadores-card">
      <mat-card-header>
        <mat-card-title>
          <mat-icon>trending_up</mat-icon>
          Indicadores Económicos
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <ng-container *ngIf="indicadores$ | async as ind; else loading">
          <div class="indicadores-grid">
            <div class="indicador">
              <span class="label">Dólar</span>
              <span class="valor">\${{ ind.dolar | number:'1.0-0' }}</span>
            </div>
            <div class="indicador">
              <span class="label">UF</span>
              <span class="valor">\${{ ind.uf | number:'1.0-0' }}</span>
            </div>
            <div class="indicador">
              <span class="label">UTM</span>
              <span class="valor">\${{ ind.utm | number:'1.0-0' }}</span>
            </div>
            <div class="indicador">
              <span class="label">Euro</span>
              <span class="valor">\${{ ind.euro | number:'1.0-0' }}</span>
            </div>
          </div>
          <div class="actualizado">
            Actualizado: {{ ind.actualizado | date:'short' }}
          </div>
        </ng-container>
        <ng-template #loading>
          <div class="loading">Cargando indicadores...</div>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .indicadores-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .indicadores-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 1rem 0;
    }
    .indicador {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
    }
    .label {
      font-size: 0.9rem;
      font-weight: 500;
    }
    .valor {
      font-size: 1.2rem;
      font-weight: bold;
    }
    .actualizado {
      font-size: 0.7rem;
      text-align: center;
      margin-top: 0.5rem;
      opacity: 0.8;
    }
    .loading {
      text-align: center;
      padding: 1rem;
    }
  `]
})
export class IndicadoresWidgetComponent implements OnInit {
  indicadoresService = inject(IndicadoresService);
  indicadores$ = this.indicadoresService.indicadores$;

  ngOnInit() {
    this.indicadoresService.actualizarIndicadores();
  }
}

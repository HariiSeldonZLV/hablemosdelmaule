// src/app/shared/components/indicadores-widget/indicadores-widget.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IndicadoresService, CommodityAgricola } from '../../../core/services/indicadores.service';

@Component({
  selector: 'app-indicadores-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="indicadores-card">
      <mat-card-header>
        <mat-card-title>
          <mat-icon>trending_up</mat-icon>
          Mercados y Commodities
        </mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <!-- Navegación con pestañas -->
        <div class="tabs-container">
          <button
            class="tab-btn"
            [class.active]="tabActivo === 'indicadores'"
            (click)="cambiarTab('indicadores')">
            <mat-icon>attach_money</mat-icon>
            Indicadores
          </button>
          <button
            class="tab-btn"
            [class.active]="tabActivo === 'commodities'"
            (click)="cambiarTab('commodities')">
            <mat-icon>agriculture</mat-icon>
            Commodities
          </button>
        </div>

        <!-- Contenido de Indicadores Económicos -->
        <div *ngIf="tabActivo === 'indicadores'" class="tab-content">
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
        </div>

        <!-- Contenido de Commodities Agrícolas -->
        <div *ngIf="tabActivo === 'commodities'" class="tab-content">
          <ng-container *ngIf="commodities$ | async as data; else loading">
            <div class="commodities-grid">
              <div class="commodity-item" *ngFor="let item of data.commodities">
                <div class="commodity-header">
                  <mat-icon class="commodity-icono">{{ item.icono }}</mat-icon>
                  <span class="commodity-nombre">{{ item.nombre }}</span>
                </div>
                <div class="commodity-precio">
                  <span class="valor">{{ item.precio | number:'1.0-2' }}</span>
                  <span class="unidad">{{ item.unidad }}</span>
                </div>
                <div class="commodity-variacion" [class.positiva]="item.variacion > 0" [class.negativa]="item.variacion < 0">
                  <mat-icon>{{ item.variacion > 0 ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>
                  {{ item.variacion > 0 ? '+' : '' }}{{ item.variacion }}%
                </div>
              </div>
            </div>
            <div class="actualizado">
              Actualizado: {{ data.actualizado | date:'short' }}
            </div>
          </ng-container>
        </div>

        <ng-template #loading>
          <div class="loading">Cargando datos...</div>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .indicadores-card {
      background: #cc0000;
      color: white;
      border-radius: 0;
      box-shadow: none;
      border: 1px solid #b30000;
    }

    .indicadores-card .mat-card-header {
      background: #b30000;
      padding: 12px 16px;
      margin: -16px -16px 0 -16px;
      border-bottom: 2px solid #990000;
      border-radius: 0;
    }

    .indicadores-card .mat-card-title {
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .indicadores-card .mat-card-title .mat-icon {
      color: #ffcc00;
    }

    .indicadores-card .mat-card-content {
      padding: 16px;
    }

    .tabs-container {
      display: flex;
      gap: 4px;
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 8px;
    }

    .tab-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: white;
      padding: 6px 14px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s;
      font-family: inherit;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .tab-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .tab-btn.active {
      background: #ffcc00;
      color: #cc0000;
      border-color: #ffcc00;
    }

    .tab-btn .mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      line-height: 16px;
    }

    .tab-content {
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .indicadores-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      padding: 0.5rem 0;
    }

    .indicador {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      transition: background 0.2s;
    }

    .indicador:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .label {
      font-size: 0.7rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
      margin-bottom: 4px;
    }

    .valor {
      font-size: 1.3rem;
      font-weight: 900;
      letter-spacing: -0.5px;
    }

    .commodities-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      padding: 0.5rem 0;
    }

    .commodity-item {
      display: flex;
      flex-direction: column;
      padding: 0.75rem 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      transition: all 0.2s;
    }

    .commodity-item:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    .commodity-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }

    .commodity-icono {
      color: #ffcc00;
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    .commodity-nombre {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .commodity-precio {
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 2px;
    }

    .commodity-precio .valor {
      font-size: 1.1rem;
      font-weight: 900;
      letter-spacing: -0.5px;
    }

    .commodity-precio .unidad {
      font-size: 0.6rem;
      opacity: 0.7;
    }

    .commodity-variacion {
      font-size: 0.7rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .commodity-variacion.positiva {
      color: #8bc34a;
    }

    .commodity-variacion.negativa {
      color: #ff6b6b;
    }

    .commodity-variacion .mat-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
      line-height: 14px;
    }

    .actualizado {
      font-size: 0.7rem;
      text-align: center;
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .loading {
      text-align: center;
      padding: 1.5rem;
      font-size: 0.9rem;
      opacity: 0.9;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .indicadores-grid,
      .commodities-grid {
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
      }

      .tab-btn {
        font-size: 0.65rem;
        padding: 4px 10px;
      }

      .tab-btn .mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }
    }
  `]
})
export class IndicadoresWidgetComponent implements OnInit {
  indicadoresService = inject(IndicadoresService);
  indicadores$ = this.indicadoresService.indicadores$;
  commodities$ = this.indicadoresService.commodities$;

  tabActivo: 'indicadores' | 'commodities' = 'indicadores';

  ngOnInit() {
    this.indicadoresService.actualizarIndicadores();
    this.indicadoresService.actualizarCommodities();
  }

  cambiarTab(tab: 'indicadores' | 'commodities'): void {
    this.tabActivo = tab;
  }
}

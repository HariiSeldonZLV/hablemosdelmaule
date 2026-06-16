// src/app/features/noticias/pages/lista-noticias/lista-noticias.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasFirebaseService } from '../../../../core/services/noticias-firebase.service';
import { IndicadoresWidgetComponent } from '../../../../shared/components/indicadores-widget/indicadores-widget.component';
import { ClimaWidgetComponent } from '../../../../shared/components/clima-widget/clima-widget.component';
import { PodcastPlayerComponent } from '../../../../shared/components/podcast-player/podcast-player.component';

@Component({
  selector: 'app-lista-noticias',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IndicadoresWidgetComponent,
    ClimaWidgetComponent,
    PodcastPlayerComponent
  ],
  template: `
    <div class="newsweek-container">
      <div class="revista-grid">
        <!-- Columna principal -->
        <div class="main-column">
          <!-- Featured Top Story -->
          <div class="top-story" *ngIf="noticiasService.noticias()[0] as destacada">
            <div class="top-story-image">
              <img [src]="destacada.imagen || 'https://placehold.co/800x450/cc0000/white?text=NOTICIAS+MAULE'"
                   [alt]="destacada.titulo">
            </div>
            <div class="top-story-content">
              <span class="top-story-category">PORTADA</span>
              <h1 class="top-story-title">
                <a [routerLink]="['/noticia', destacada.slug]">{{ destacada.titulo }}</a>
              </h1>
              <p class="top-story-description">{{ destacada.resumen }}</p>
            </div>
          </div>

          <!-- Grid de noticias secundarias -->
          <div class="secondary-grid">
            <div class="secondary-story" *ngFor="let noticia of noticiasService.noticias().slice(1, 5)">
              <div class="secondary-image">
                <img [src]="noticia.imagen || 'https://placehold.co/400x250/666666/white?text=Noticia'"
                     [alt]="noticia.titulo">
              </div>
              <div class="secondary-content">
                <span class="secondary-category">{{ noticia.categoria || 'REGIONAL' }}</span>
                <h2 class="secondary-title">
                  <a [routerLink]="['/noticia', noticia.slug]">{{ noticia.titulo }}</a>
                </h2>
                <p class="secondary-summary">{{ noticia.resumen | slice:0:100 }}...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
          <app-indicadores-widget />
          <app-clima-widget />
          <app-podcast-player />

          <!-- Listado numerado estilo Newsweek -->
          <div class="sidebar-widget">
            <div class="sidebar-header">LO MÁS LEÍDO</div>
            <div class="sidebar-content">
              <ul class="news-list-numbered">
                <li *ngFor="let noticia of noticiasService.noticias().slice(0, 7); let i = index">
                  <span class="news-number">{{ (i+1).toString().padStart(2,'0') }}</span>
                  <div class="news-list-info">
                    <div class="news-list-title">
                      <a [routerLink]="['/noticia', noticia.slug]">{{ noticia.titulo | slice:0:70 }}...</a>
                    </div>
                    <div class="news-list-summary">{{ noticia.resumen | slice:0:60 }}...</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Banner publicitario -->
          <div class="sidebar-widget">
            <div class="sidebar-header">PUBLICIDAD</div>
            <div class="sidebar-content" style="text-align: center; padding: 40px 20px;">
              <p>Espacio disponible</p>
              <small>contacto&#64;noticiasmaule.cl</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .newsweek-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .revista-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
    }

    /* Top Story */
    .top-story {
      background: white;
      margin-bottom: 30px;
      border: 1px solid #e0e0e0;
    }

    .top-story-image img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .top-story-content {
      padding: 20px;
    }

    .top-story-category {
      color: #cc0000;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: block;
      margin-bottom: 10px;
    }

    .top-story-title {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 15px;
      line-height: 1.2;
    }

    .top-story-title a {
      color: #1a1a1a;
    }

    .top-story-description {
      color: #666;
      line-height: 1.5;
    }

    /* Secondary Grid */
    .secondary-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .secondary-story {
      background: white;
      border: 1px solid #e0e0e0;
    }

    .secondary-image img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

    .secondary-content {
      padding: 15px;
    }

    .secondary-category {
      color: #cc0000;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .secondary-title {
      font-size: 1rem;
      font-weight: 700;
      margin: 10px 0;
    }

    .secondary-title a {
      color: #1a1a1a;
    }

    .secondary-summary {
      font-size: 0.8rem;
      color: #666;
    }

    /* Sidebar */
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .sidebar-widget {
      background: white;
      border: 1px solid #e0e0e0;
    }

    .sidebar-header {
      background: #cc0000;
      color: white;
      padding: 10px 15px;
      font-weight: 700;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .sidebar-content {
      padding: 15px;
    }

    /* Lista numerada */
    .news-list-numbered {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .news-list-numbered li {
      display: flex;
      gap: 15px;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .news-list-numbered li:last-child {
      border-bottom: none;
    }

    .news-number {
      font-size: 1.6rem;
      font-weight: 700;
      color: #cc0000;
      line-height: 1;
      min-width: 35px;
    }

    .news-list-title {
      font-weight: 700;
      font-size: 0.85rem;
      margin-bottom: 5px;
    }

    .news-list-title a {
      color: #1a1a1a;
    }

    .news-list-summary {
      font-size: 0.7rem;
      color: #666;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .revista-grid {
        grid-template-columns: 1fr;
      }

      .secondary-grid {
        grid-template-columns: 1fr;
      }

      .top-story-title {
        font-size: 1.4rem;
      }
    }
  `]
})
export class ListaNoticiasComponent implements OnInit {
  noticiasService = inject(NoticiasFirebaseService);

  ngOnInit() {
    this.noticiasService.cargarNoticias();
  }
}

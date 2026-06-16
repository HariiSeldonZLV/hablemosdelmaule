// src/app/features/noticias/pages/detalle-noticia/detalle-noticia.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NoticiasService, Noticia } from '../../../../core/services/noticias.service';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="detalle-container">
      <mat-card class="detalle-card" *ngIf="noticia; else noEncontrada">
        <mat-card-header>
          <mat-card-title>{{ noticia.titulo }}</mat-card-title>
          <mat-card-subtitle>{{ noticia.fecha | date:'dd/MM/yyyy HH:mm' }}</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image [src]="noticia.imagen || 'assets/default-news.jpg'" [alt]="noticia.titulo">
        <mat-card-content>
          <p class="contenido">{{ noticia.contenido }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/">← Volver a noticias</button>
        </mat-card-actions>
      </mat-card>
      <ng-template #noEncontrada>
        <div class="error-message">
          <h2>Noticia no encontrada</h2>
          <button mat-button routerLink="/">Volver al inicio</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .detalle-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .contenido {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #333;
      white-space: pre-wrap;
    }
    .error-message {
      text-align: center;
      padding: 3rem;
    }
  `]
})
export class DetalleNoticiaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private noticiasService = inject(NoticiasService);
  noticia: Noticia | null = null;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.cargarNoticia(slug);
    }
  }

  cargarNoticia(slug: string) {
    const noticias = this.noticiasService.noticias();
    const encontrada = noticias.find((n: Noticia) => n.slug === slug);
    this.noticia = encontrada || null;
  }
}

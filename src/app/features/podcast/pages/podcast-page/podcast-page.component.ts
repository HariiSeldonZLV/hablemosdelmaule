// src/app/features/podcast/pages/podcast-page/podcast-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PodcastPlayerComponent } from '../../../../shared/components/podcast-player/podcast-player.component';

@Component({
  selector: 'app-podcast-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, PodcastPlayerComponent],
  template: `
    <div class="podcast-page">
      <h1>Podcast Noticias Maule</h1>
      <p class="descripcion">Escucha nuestras transmisiones en vivo y episodios anteriores</p>
      <app-podcast-player></app-podcast-player>
    </div>
  `,
  styles: [`
    .podcast-page {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: #1a1a2e;
    }
    .descripcion {
      color: #666;
      margin-bottom: 2rem;
    }
  `]
})
export class PodcastPageComponent {}

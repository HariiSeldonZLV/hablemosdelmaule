// src/app/shared/components/podcast-player/podcast-player.component.ts
import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PodcastService, EpisodioPodcast } from '../../../core/services/podcast.service';

@Component({
  selector: 'app-podcast-player',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="podcast-card">
      <mat-card-content>
        <div class="player-container">
          <div class="audio-info">
            <span class="programa">🎙️ Noticias Maule en Vivo</span>
            <span class="horario">Transmisión 24/7</span>
          </div>

          <audio #audioPlayer controls class="audio-player">
            <source [src]="streamUrl" type="audio/mpeg">
            Tu navegador no soporta audio HTML5.
          </audio>

          <div class="episodios">
            <h4 *ngIf="(episodios$ | async)?.length">📻 Episodios Recientes</h4>
            <div class="episodio-item" *ngFor="let ep of episodios$ | async" (click)="reproducirEpisodio(ep)">
              <mat-icon>play_circle</mat-icon>
              <div class="ep-info">
                <div class="titulo">{{ ep.titulo }}</div>
                <div class="fecha">{{ ep.fecha | date:'dd/MM/yyyy' }}</div>
              </div>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .podcast-card {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: white;
    }
    .player-container {
      padding: 1rem;
    }
    .audio-info {
      margin-bottom: 1rem;
      text-align: center;
    }
    .programa {
      font-size: 1.2rem;
      font-weight: bold;
      display: block;
    }
    .horario {
      font-size: 0.8rem;
      opacity: 0.8;
    }
    .audio-player {
      width: 100%;
      margin: 1rem 0;
      border-radius: 30px;
    }
    .episodios {
      margin-top: 1.5rem;
    }
    h4 {
      margin-bottom: 1rem;
      color: #ffd700;
    }
    .episodio-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      margin: 0.5rem 0;
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .episodio-item:hover {
      background: rgba(255,255,255,0.2);
      transform: translateX(5px);
    }
    .titulo {
      font-size: 0.9rem;
    }
    .fecha {
      font-size: 0.7rem;
      opacity: 0.7;
    }
  `]
})
export class PodcastPlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  podcastService = inject(PodcastService);
  streamUrl = '';
  episodios$ = this.podcastService.episodios$;

  ngOnInit() {
    this.streamUrl = this.podcastService.getStreamUrl();
    // Los episodios ya se cargan en el servicio
  }

  reproducirEpisodio(episodio: EpisodioPodcast) {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      this.audioPlayer.nativeElement.src = episodio.audioUrl;
      this.audioPlayer.nativeElement.play();
    }
  }
}

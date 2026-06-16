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
      <mat-card-header>
        <mat-card-title>
          <mat-icon>mic</mat-icon>
          Podcast Noticias Maule
        </mat-card-title>
      </mat-card-header>
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
      background: #cc0000;
      color: white;
      border-radius: 0;
      box-shadow: none;
      border: 1px solid #b30000;
    }

    .podcast-card .mat-card-header {
      background: #b30000;
      padding: 12px 16px;
      margin: -16px -16px 0 -16px;
      border-bottom: 2px solid #990000;
      border-radius: 0;
    }

    .podcast-card .mat-card-title {
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .podcast-card .mat-card-title .mat-icon {
      color: #ffcc00;
    }

    .podcast-card .mat-card-content {
      padding: 16px;
    }

    .player-container {
      padding: 0;
    }

    .audio-info {
      margin-bottom: 1rem;
      text-align: center;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
    }

    .programa {
      font-size: 1.1rem;
      font-weight: 700;
      display: block;
      letter-spacing: 0.5px;
    }

    .horario {
      font-size: 0.8rem;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .audio-player {
      width: 100%;
      margin: 1rem 0;
      border-radius: 0;
      background: #990000;
      height: 40px;
    }

    .audio-player::-webkit-media-controls-panel {
      background: #990000;
    }

    .audio-player::-webkit-media-controls-current-time-display,
    .audio-player::-webkit-media-controls-time-remaining-display {
      color: white;
    }

    .episodios {
      margin-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 1rem;
    }

    h4 {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #ffcc00;
      margin-bottom: 1rem;
      margin-top: 0;
    }

    .episodio-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 0.75rem;
      margin: 0.5rem 0;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
      transition: all 0.2s;
    }

    .episodio-item:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateX(4px);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .episodio-item .mat-icon {
      color: #ffcc00;
      font-size: 1.8rem;
      width: 1.8rem;
      height: 1.8rem;
    }

    .ep-info {
      flex: 1;
      min-width: 0;
    }

    .titulo {
      font-size: 0.85rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .fecha {
      font-size: 0.7rem;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.3px;
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

// src/app/core/services/podcast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface EpisodioPodcast {
  id: number;
  titulo: string;
  descripcion: string;
  audioUrl: string;
  fecha: Date;
  duracion: number;
}

@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  private episodiosSubject = new BehaviorSubject<EpisodioPodcast[]>([]);
  public episodios$ = this.episodiosSubject.asObservable();

  constructor() {
    this.cargarEpisodios();
  }

  cargarEpisodios() {
    // Mock de episodios - luego conectar a API real
    const episodiosMock: EpisodioPodcast[] = [
      {
        id: 1,
        titulo: 'Entrevista al Gobernador del Maule',
        descripcion: 'Conversamos sobre los proyectos regionales',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        fecha: new Date('2024-01-15'),
        duracion: 1800
      },
      {
        id: 2,
        titulo: 'Análisis económico de la región',
        descripcion: 'Especialistas hablan sobre el desarrollo',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        fecha: new Date('2024-01-10'),
        duracion: 2400
      },
      {
        id: 3,
        titulo: 'Cultura y tradiciones del Maule',
        descripcion: 'Descubriendo nuestras raíces',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        fecha: new Date('2024-01-05'),
        duracion: 2100
      }
    ];
    this.episodiosSubject.next(episodiosMock);
  }

  // Método para obtener URL del stream en vivo
  getStreamUrl(): string {
    // Reemplazar con URL real del stream
    return 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  }
}

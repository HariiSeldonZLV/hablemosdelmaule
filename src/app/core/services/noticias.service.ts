// src/app/core/services/noticias.service.ts
import { Injectable, signal } from '@angular/core';

export interface Noticia {
  id?: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: Date;
  slug: string;
  autor: string;
  categoria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private noticiasSignal = signal<Noticia[]>([]);
  public noticias = this.noticiasSignal.asReadonly();

  cargarNoticias() {
    const noticiasMock: Noticia[] = [
      {
        id: '1',
        titulo: 'Lanzan nuevo programa de desarrollo regional en el Maule',
        resumen: 'Iniciativa busca potenciar el emprendimiento local y generar nuevos puestos de trabajo en la región.',
        contenido: 'En una ceremonia realizada en la capital regional, autoridades dieron el vamos a este ambicioso proyecto...',
        imagen: 'https://placehold.co/600x400/cc0000/white?text=Noticia+1',
        fecha: new Date(),
        slug: 'lanzan-nuevo-programa-desarrollo-regional-maule',
        autor: 'Redacción',
        categoria: 'Regional'
      },
      {
        id: '2',
        titulo: 'Mejoras en conectividad para zonas rurales',
        resumen: 'Anuncian inversión en infraestructura digital para 15 comunas de la región.',
        contenido: 'El gobierno regional anunció un plan de conectividad que beneficiará a más de 50 mil habitantes...',
        imagen: 'https://placehold.co/600x400/cc0000/white?text=Noticia+2',
        fecha: new Date(Date.now() - 86400000),
        slug: 'mejoras-conectividad-zonas-rurales-maule',
        autor: 'Redacción',
        categoria: 'Regional'
      },
      {
        id: '3',
        titulo: 'Feria del Libro llega a Talca',
        resumen: 'Evento cultural reunirá a escritores nacionales e internacionales.',
        contenido: 'La vigésima versión de la Feria del Libro de Talca se realizará en la Plaza de Armas...',
        imagen: 'https://placehold.co/600x400/cc0000/white?text=Noticia+3',
        fecha: new Date(Date.now() - 172800000),
        slug: 'feria-libro-llega-talca',
        autor: 'Redacción',
        categoria: 'Cultura'
      }
    ];
    this.noticiasSignal.set(noticiasMock);
  }
}

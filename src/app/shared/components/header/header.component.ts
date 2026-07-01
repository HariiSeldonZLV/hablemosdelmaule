// src/app/shared/components/header/header.component.ts
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClimaService, CiudadClima } from '../../../core/services/clima.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header class="newsweek-header">
      <div class="top-bar">
        <div class="top-container">
          <div class="date-info">
            {{ today | date:'EEEE, d MMMM, yyyy' }}
          </div>
          <div class="logo-top">📰</div>
          <div class="weather-ticker">
            <div class="ticker-track" [style.transform]="'translateX(' + offset + 'px)'">
              <span
                class="ticker-item"
                *ngFor="let item of tickerItems; let i = index"
                [class.active]="i === itemActivo">
                <span class="ticker-ciudad">{{ item.nombre }}</span>
                <span class="ticker-temp">{{ item.temperatura }}°C</span>
                <span class="ticker-clima">{{ item.clima }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">UYUY<span> TV</span></h1>
          <p class="hero-subtitle">DOMINGO<span> 20 hrs</span></p>
          <p class="hero-tagline">La información PRECISA de Teno a Conti</p>
          <p class="hero-tagline">Fuentes confiables, datos veraces</p>
        </div>
      </div>

      <nav class="main-nav">
        <div class="nav-container">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">INICIO</a>
          <a href="#">REGIONAL</a>
          <a href="#">POLÍTICA</a>
          <a href="#">ECONOMÍA</a>
          <a href="#">DEPORTES</a>
          <a href="#">CULTURA</a>
          <a routerLink="/podcast" routerLinkActive="active">PODCAST-YOUTUBE</a>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    // ==========================================
    // IMPORTAR FUENTES DIRECTAMENTE AQUÍ
    // ==========================================
    @import url('https://fonts.googleapis.com/css2?family=Michroma&family=Caprasimo&family=Noto+Sans+Grantha&display=swap');

    // ==========================================
    // FUENTE MICHROMA - FORZADA PARA HERO
    // ==========================================
    .hero-title,
    .hero h1,
    .hero-section .hero-title,
    h1.hero-title {
      font-family: 'Michroma', cursive !important;
      font-weight: 400 !important;
      letter-spacing: 2px !important;
      text-transform: uppercase !important;
    }

    .hero-title span {
      font-family: 'Michroma', cursive !important;
      color: #ff4444;
    }

    .hero-subtitle {
      font-family: 'Michroma', cursive !important;
      font-weight: 400 !important;
      letter-spacing: 4px !important;
    }

    .hero-tagline {
      font-family: 'Michroma', cursive !important;
      font-weight: 400 !important;
      letter-spacing: 3px !important;
      text-transform: uppercase !important;
    }

    // ==========================================
    // NAVEGACIÓN - MICHROMA
    // ==========================================
    .main-nav a {
      font-family: 'Michroma', cursive !important;
      font-weight: 400 !important;
      letter-spacing: 1px !important;
    }

    // ==========================================
    // RESTO DEL HEADER
    // ==========================================
    .newsweek-header {
      background: white;
      border-bottom: 3px solid #cc0000;
    }

    .top-bar {
      background: #cc0000;
      padding: 0.5rem 0;
      overflow: hidden;
    }

    .top-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      color: white;
      gap: 1rem;
    }

    .date-info {
      white-space: nowrap;
      font-weight: 500;
      min-width: 180px;
      font-family: 'Noto Sans Grantha', sans-serif;
    }

    .logo-top {
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: -1px;
      flex-shrink: 0;
    }

    .weather-ticker {
      flex: 1;
      overflow: hidden;
      position: relative;
      height: 24px;
      display: flex;
      align-items: center;
    }

    .ticker-track {
      display: flex;
      white-space: nowrap;
      transition: transform 0.8s ease-in-out;
      will-change: transform;
    }

    .ticker-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0 1.5rem;
      font-size: 0.8rem;
      font-weight: 500;
      opacity: 0.5;
      transition: opacity 0.3s;
      flex-shrink: 0;
      font-family: 'Noto Sans Grantha', sans-serif;
    }

    .ticker-item.active {
      opacity: 1;
      font-weight: 700;
    }

    .ticker-ciudad {
      text-transform: uppercase;
      font-weight: 600;
    }

    .ticker-temp {
      font-weight: 700;
      color: #ffcc00;
    }

    .ticker-clima {
      font-size: 0.7rem;
      opacity: 0.8;
      text-transform: uppercase;
    }

    .hero-section {
      position: relative;
      background-image: url('./assets/images/hero-bg.jpg');
      background-size: cover;
      background-position: center;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }

    .hero-content {
      position: relative;
      z-index: 2;
      color: white;
    }

    .hero-title {
      font-family: 'Michroma', cursive !important;
      font-size: 4rem;
      font-weight: 400 !important;
      letter-spacing: -1px;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .hero-title span {
      color: #ff4444;
    }

    .hero-subtitle {
      font-family: 'Michroma', cursive !important;
      font-size: 1.2rem;
      font-weight: 400 !important;
      letter-spacing: 4px;
      margin: 0.5rem 0;
      opacity: 0.9;
    }

    .hero-subtitle span {
      font-weight: 700;
      color: #ff4444;
    }

    .hero-tagline {
      font-family: 'Michroma', cursive !important;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: 300 !important;
    }

    .main-nav {
      background: #cc0000;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    .main-nav a {
      color: white;
      text-decoration: none;
      padding: 1rem 0.5rem;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      transition: all 0.3s;
      font-family: 'Michroma', cursive !important;
    }

    .main-nav a:hover {
      background: #990000;
    }

    .main-nav a.active {
      background: #990000;
      border-bottom: 3px solid white;
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 200px;
      }

      .hero-title {
        font-size: 2rem !important;
      }

      .hero-tagline {
        font-size: 0.7rem !important;
      }

      .main-nav a {
        font-size: 0.7rem;
        padding: 0.75rem 0.3rem;
      }

      .top-container {
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
      }

      .date-info {
        font-size: 0.7rem;
        min-width: auto;
      }

      .weather-ticker {
        height: 20px;
        width: 100%;
        order: 3;
      }

      .ticker-item {
        font-size: 0.7rem;
        padding: 0 0.8rem;
      }

      .ticker-temp {
        font-size: 0.7rem;
      }

      .logo-top {
        font-size: 1.2rem;
      }
    }

    @media (max-width: 480px) {
      .ticker-item {
        gap: 0.3rem;
        padding: 0 0.5rem;
        font-size: 0.6rem;
      }

      .ticker-ciudad {
        font-size: 0.6rem;
      }

      .ticker-temp {
        font-size: 0.6rem;
      }

      .ticker-clima {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  today = new Date();
  tickerItems: { nombre: string; temperatura: number; clima: string }[] = [];
  offset = 0;
  itemActivo = 0;
  private intervalId: any;
  private subscription: Subscription | null = null;

  private readonly CIUDADES_ORDEN = [
    'Talca', 'Curicó', 'San Clemente', 'Teno',
    'Licantén', 'Romeral', 'Constitución', 'Molina', 'Río Claro'
  ];

  constructor(private climaService: ClimaService) {}

  ngOnInit() {
    this.subscription = this.climaService.ciudades$.subscribe(ciudades => {
      this.actualizarTicker(ciudades);
    });

    this.intervalId = setInterval(() => {
      this.moverTicker();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private actualizarTicker(ciudades: CiudadClima[]): void {
    const items = ciudades
      .filter(c => c.clima !== null)
      .map(c => ({
        nombre: c.nombre,
        temperatura: c.clima?.temperatura || 0,
        clima: c.clima?.clima || '--'
      }));

    this.tickerItems = this.CIUDADES_ORDEN
      .map(nombre => items.find(item => item.nombre === nombre))
      .filter((item): item is { nombre: string; temperatura: number; clima: string } => item !== undefined);

    if (this.tickerItems.length === 0) {
      const talca = ciudades.find(c => c.nombre === 'Talca');
      if (talca?.clima) {
        this.tickerItems = [{
          nombre: 'Talca',
          temperatura: talca.clima.temperatura,
          clima: talca.clima.clima
        }];
      } else {
        this.tickerItems = [{
          nombre: 'Talca',
          temperatura: 22,
          clima: 'Parcialmente nublado'
        }];
      }
    }

    this.itemActivo = 0;
    this.actualizarOffset();
  }

  private moverTicker(): void {
    if (this.tickerItems.length === 0) return;
    this.itemActivo = (this.itemActivo + 1) % this.tickerItems.length;
    this.actualizarOffset();
  }

  private actualizarOffset(): void {
    const containerWidth = document.querySelector('.weather-ticker')?.clientWidth || 300;
    this.offset = -this.itemActivo * 120 + (containerWidth / 2 - 60);
    const maxOffset = 0;
    const minOffset = -(this.tickerItems.length - 1) * 120;
    this.offset = Math.max(minOffset, Math.min(maxOffset, this.offset));
  }
}

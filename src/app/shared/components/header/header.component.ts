// src/app/shared/components/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="newsweek-header">
      <div class="top-bar">
        <div class="top-container">
          <div class="date-info">
            {{ today | date:'EEEE, d MMMM, yyyy' }}
          </div>
          <div class="logo-top">📰</div>
          <div class="weather-info">🌡️ Talca - 22°C</div>
        </div>
      </div>

      <div class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">HABLEMOS DEL<span>MAULE</span></h1>
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
    .newsweek-header {
      background: white;
      border-bottom: 3px solid #cc0000;
    }

    .top-bar {
      background: #cc0000;
      padding: 0.5rem 0;
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
      font-size: 4rem;
      font-weight: 900;
      letter-spacing: -2px;
      margin: 0;
    }

    .hero-title span {
      color: #ff4444;
    }

    .hero-tagline {
      font-size: 0.9rem;
      margin-top: 0.5rem;
      letter-spacing: 2px;
      text-transform: uppercase;
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
        font-size: 2rem;
      }

      .hero-tagline {
        font-size: 0.7rem;
      }

      .main-nav a {
        font-size: 0.7rem;
        padding: 0.75rem 0.3rem;
      }
    }
  `]
})
export class HeaderComponent {
  today = new Date();
}

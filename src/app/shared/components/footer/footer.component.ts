// src/app/shared/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="newsweek-footer">
      <div class="footer-top">
        <div class="container">
          <div class="footer-logo">
            <h2>NOTICIAS <span>MAULE</span></h2>
            <p>La información veraz de la Región del Maule</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>SECCIONES</h4>
              <ul>
                <li><a routerLink="/">Inicio</a></li>
                <li><a href="#">Regional</a></li>
                <li><a href="#">Política</a></li>
                <li><a href="#">Economía</a></li>
                <li><a href="#">Deportes</a></li>
                <li><a href="#">Cultura</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h4>LEGAL</h4>
              <ul>
                <li><a href="#">Términos de uso</a></li>
                <li><a href="#">Política de privacidad</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a routerLink="/admin">Administración</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h4>SÍGUENOS</h4>
              <div class="social-icons">
                <a href="#" class="social-icon">📘 Facebook</a>
                <a href="#" class="social-icon">🐦 Twitter</a>
                <a href="#" class="social-icon">📷 Instagram</a>
                <a href="#" class="social-icon">▶️ YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; 2026 Noticias Maule. Todos los derechos reservados.</p>
          <p>Fundado en 2026 - Comprometidos con la verdad de la Región del Maule</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .newsweek-footer {
      background: #cc0000;  /* Rojo fuerte directo */
      color: white;
      margin-top: 3rem;
    }

    .footer-top {
      padding: 3rem 0 2rem;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .footer-logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .footer-logo h2 {
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
    }

    .footer-logo span {
      color: #1a1a1a;  /* Negro para contraste */
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      text-align: center;
    }

    .link-group h4 {
      margin-bottom: 1rem;
      font-weight: 700;
      letter-spacing: 1px;
      color: white;
    }

    .link-group ul {
      list-style: none;
      padding: 0;
    }

    .link-group ul li {
      margin-bottom: 0.5rem;
    }

    .link-group ul li a {
      color: white;
      text-decoration: none;
      opacity: 0.85;
      transition: opacity 0.3s;
    }

    .link-group ul li a:hover {
      opacity: 1;
      text-decoration: underline;
    }

    .social-icons {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .social-icon {
      color: white;
      text-decoration: none;
      opacity: 0.85;
      transition: all 0.3s;
      display: inline-block;
    }

    .social-icon:hover {
      opacity: 1;
      transform: translateX(5px);
    }

    .footer-bottom {
      padding: 1.5rem 0;
      background: #990000;  /* Rojo más oscuro para el pie */
      text-align: center;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .footer-links {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .footer-top {
        padding: 2rem 0;
      }

      .social-icons {
        align-items: center;
      }
    }
  `]
})
export class FooterComponent {}

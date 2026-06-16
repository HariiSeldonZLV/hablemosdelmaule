// src/app/features/admin/pages/admin-page/admin-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-page',
  standalone: false,
  template: `
    <div class="admin-container">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al sistema de administración de Noticias Maule</p>
      <div class="admin-section">
        <h2>Gestión de Noticias</h2>
        <button (click)="crearNoticia()">Crear Nueva Noticia</button>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 2rem;
    }
    .admin-section {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AdminPageComponent {
  crearNoticia() {
    alert('Funcionalidad en desarrollo');
  }
}

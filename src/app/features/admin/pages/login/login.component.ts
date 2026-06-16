// src/app/features/admin/pages/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>🔐 Acceso Administrador</mat-card-title>
          <mat-card-subtitle>Ingresa tus credenciales</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput type="email" [(ngModel)]="email" placeholder="admin@noticiasmaule.cl">
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Contraseña</mat-label>
            <input matInput [type]="hide ? 'password' : 'text'" [(ngModel)]="password">
            <button mat-icon-button matSuffix (click)="hide = !hide">
              <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
          </mat-form-field>
          <div *ngIf="error" class="error">{{ error }}</div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="login()" class="login-btn">Ingresar</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .login-card { max-width: 400px; width: 100%; padding: 2rem; }
    .full-width { width: 100%; margin-bottom: 1rem; }
    .login-btn { width: 100%; }
    .error { color: red; margin-top: 1rem; text-align: center; }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  hide = true;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    const success = await this.authService.login(this.email, this.password);
    if (success) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error = 'Email o contraseña incorrectos';
    }
  }
}

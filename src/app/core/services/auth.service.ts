// src/app/core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  async login(email: string, password: string): Promise<boolean> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('admin_email', email);
      return true;
    } catch (error) {
      console.error('Error de login:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_email');
    this.router.navigate(['/admin']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('admin_logged_in') === 'true';
  }
}

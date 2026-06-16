// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/noticias/pages/lista-noticias/lista-noticias.component')
      .then(m => m.ListaNoticiasComponent)
  },
  {
    path: 'noticia/:slug',
    loadComponent: () => import('./features/noticias/pages/detalle-noticia/detalle-noticia.component')
      .then(m => m.DetalleNoticiaComponent)
  },
  {
    path: 'podcast',
    loadComponent: () => import('./features/podcast/pages/podcast-page/podcast-page.component')
      .then(m => m.PodcastPageComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./features/admin/pages/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/editor',
    loadComponent: () => import('./features/admin/pages/editor/editor.component')
      .then(m => m.EditorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/editor/:id',
    loadComponent: () => import('./features/admin/pages/editor/editor.component')
      .then(m => m.EditorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

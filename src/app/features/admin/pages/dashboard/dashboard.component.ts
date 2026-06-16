import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoticiasFirebaseService } from '../../../../core/services/noticias-firebase.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatTableModule, MatToolbarModule],
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary" class="dashboard-header">
        <span>📰 Panel de Administración</span>
        <span class="spacer"></span>
        <button mat-raised-button color="warn" (click)="logout()">
          <mat-icon>logout</mat-icon> Cerrar Sesión
        </button>
      </mat-toolbar>

      <div class="dashboard-content">
        <mat-tab-group>
          <mat-tab label="📰 Noticias">
            <div class="tab-content">
              <button mat-raised-button color="primary" (click)="crearNoticia()">
                <mat-icon>add</mat-icon> Nueva Noticia
              </button>

              <div class="table-container" *ngIf="noticiasService.noticias().length > 0; else sinNoticias">
                <table mat-table [dataSource]="noticiasService.noticias()">
                  <ng-container matColumnDef="titulo">
                    <th mat-header-cell *matHeaderCellDef>Título</th>
                    <td mat-cell *matCellDef="let n">{{ n.titulo }}</td>
                  </ng-container>
                  <ng-container matColumnDef="fecha">
                    <th mat-header-cell *matHeaderCellDef>Fecha</th>
                    <td mat-cell *matCellDef="let n">{{ n.fecha | date:'dd/MM/yyyy' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="acciones">
                    <th mat-header-cell *matHeaderCellDef>Acciones</th>
                    <td mat-cell *matCellDef="let n">
                      <button mat-icon-button color="primary" (click)="editarNoticia(n)"><mat-icon>edit</mat-icon></button>
                      <button mat-icon-button color="warn" (click)="eliminarNoticia(n)"><mat-icon>delete</mat-icon></button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="displayedColumns"><tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                </table>
              </div>
              <ng-template #sinNoticias><p>No hay noticias</p></ng-template>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-header { background: #cc0000 !important; display: flex; justify-content: space-between; padding: 0 2rem; }
    .spacer { flex: 1; }
    .dashboard-content { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .tab-content { padding: 2rem 0; }
    .table-container { overflow-x: auto; background: white; border-radius: 8px; }
    table { width: 100%; }
  `]
})
export class DashboardComponent implements OnInit {
  noticiasService = inject(NoticiasFirebaseService);
  router = inject(Router);
  authService = inject(AuthService);
  displayedColumns: string[] = ['titulo', 'fecha', 'acciones'];

  ngOnInit() { this.noticiasService.cargarNoticias(); }
  crearNoticia() { this.router.navigate(['/admin/editor']); }
  editarNoticia(n: any) { this.router.navigate(['/admin/editor', n.id]); }
  async eliminarNoticia(n: any) {
    if (confirm('¿Eliminar?')) {
      await this.noticiasService.eliminarNoticia(n.id, n.imagen);
      alert('Eliminada');
      this.noticiasService.cargarNoticias();
    }
  }
  logout() { this.authService.logout(); }
}

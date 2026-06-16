// src/app/features/admin/pages/editor/editor.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoticiasFirebaseService } from '../../../../core/services/noticias-firebase.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="editor-container">
      <mat-card class="editor-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>{{ isEditMode ? 'edit' : 'add_circle' }}</mat-icon>
            {{ isEditMode ? 'Editar Noticia' : 'Crear Nueva Noticia' }}
          </mat-card-title>
          <mat-card-subtitle *ngIf="isEditMode">
            ID: {{ noticiaId }}
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div *ngIf="cargando" class="loading-container">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Cargando noticia...</p>
          </div>

          <form (ngSubmit)="guardar()" #formulario="ngForm" *ngIf="!cargando">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Título</mat-label>
              <input matInput [(ngModel)]="noticia.titulo" name="titulo" required>
              <mat-icon matSuffix>title</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Categoría</mat-label>
              <mat-select [(ngModel)]="noticia.categoria" name="categoria" required>
                <mat-option value="Regional">🌄 Regional</mat-option>
                <mat-option value="Politica">🏛️ Política</mat-option>
                <mat-option value="Economia">📊 Economía</mat-option>
                <mat-option value="Deportes">⚽ Deportes</mat-option>
                <mat-option value="Cultura">🎨 Cultura</mat-option>
                <mat-option value="Opinion">💭 Opinión</mat-option>
              </mat-select>
              <mat-icon matSuffix>category</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Resumen / Bajada</mat-label>
              <textarea matInput [(ngModel)]="noticia.resumen" name="resumen" rows="3" required
                        placeholder="Breve descripción de la noticia..."></textarea>
              <mat-icon matSuffix>description</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contenido completo</mat-label>
              <textarea matInput [(ngModel)]="noticia.contenido" name="contenido" rows="12" required
                        placeholder="Escribe aquí el contenido completo de la noticia..."></textarea>
              <mat-icon matSuffix>article</mat-icon>
            </mat-form-field>

            <!-- Imagen destacada -->
            <div class="image-section">
              <label class="image-label">
                <mat-icon>image</mat-icon>
                Imagen destacada
              </label>

              <div class="image-preview" *ngIf="imagenPreview || noticia.imagen">
                <img [src]="imagenPreview || noticia.imagen" alt="Vista previa">
                <button type="button" class="remove-image" (click)="removerImagen()">
                  <mat-icon>close</mat-icon>
                </button>
              </div>

              <div class="image-upload">
                <input type="file" (change)="onImageSelected($event)" accept="image/*" #fileInput style="display: none">
                <button type="button" mat-raised-button (click)="fileInput.click()">
                  <mat-icon>upload</mat-icon>
                  {{ noticia.imagen ? 'Cambiar imagen' : 'Subir imagen' }}
                </button>
                <small class="image-hint">Formatos: JPG, PNG, GIF. Tamaño máximo: 5MB</small>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" mat-button (click)="cancelar()">
                <mat-icon>cancel</mat-icon>
                Cancelar
              </button>
              <button type="submit" mat-raised-button color="primary" [disabled]="!formulario.valid || guardando">
                <mat-icon>save</mat-icon>
                {{ guardando ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Publicar') }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .editor-container {
      max-width: 900px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .editor-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }

    .full-width {
      width: 100%;
      margin-bottom: 1.5rem;
    }

    .image-section {
      margin: 1.5rem 0;
      padding: 1rem;
      border: 2px dashed #ccc;
      border-radius: 8px;
      background: #fafafa;
    }

    .image-label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #666;
    }

    .image-preview {
      position: relative;
      margin: 1rem 0;
      text-align: center;
    }

    .image-preview img {
      max-width: 100%;
      max-height: 250px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .remove-image {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.7);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }

    .remove-image:hover {
      background: rgba(204,0,0,0.9);
      transform: scale(1.1);
    }

    .image-upload {
      text-align: center;
      margin-top: 1rem;
    }

    .image-hint {
      display: block;
      margin-top: 0.5rem;
      font-size: 0.7rem;
      color: #999;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .loading-container {
      text-align: center;
      padding: 3rem;
    }

    .loading-container p {
      margin-top: 1rem;
      color: #666;
    }
  `]
})
export class EditorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noticiasService = inject(NoticiasFirebaseService);

  isEditMode = false;
  noticiaId: string | null = null;
  cargando = false;
  guardando = false;

  imagenPreview: string | null = null;
  imagenFile: File | null = null;

  noticia = {
    titulo: '',
    resumen: '',
    contenido: '',
    categoria: 'Regional',
    imagen: '',
    autor: 'Admin'
  };

  ngOnInit() {
    this.noticiaId = this.route.snapshot.paramMap.get('id');
    if (this.noticiaId) {
      this.isEditMode = true;
      this.cargarNoticia();
    }
  }

  async cargarNoticia() {
    this.cargando = true;
    try {
      const noticia = await this.noticiasService.getNoticiaById(this.noticiaId!);
      if (noticia) {
        this.noticia = {
          titulo: noticia.titulo,
          resumen: noticia.resumen,
          contenido: noticia.contenido,
          categoria: noticia.categoria || 'Regional',
          imagen: noticia.imagen || '',
          autor: noticia.autor || 'Admin'
        };
        this.imagenPreview = noticia.imagen || null;
        console.log('Noticia cargada correctamente');
      } else {
        alert('No se encontró la noticia');
        this.router.navigate(['/admin/dashboard']);
      }
    } catch (error) {
      console.error('Error al cargar noticia:', error);
      alert('Error al cargar la noticia');
    } finally {
      this.cargando = false;
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no puede superar los 5MB');
        return;
      }
      this.imagenFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removerImagen() {
    this.imagenPreview = null;
    this.imagenFile = null;
    this.noticia.imagen = '';
  }

  generarSlug(titulo: string): string {
    return titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async guardar() {
    if (!this.noticia.titulo || !this.noticia.contenido) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    this.guardando = true;
    const slug = this.generarSlug(this.noticia.titulo);

    try {
      if (this.isEditMode && this.noticiaId) {
        await this.noticiasService.actualizarNoticia(
          this.noticiaId,
          {
            titulo: this.noticia.titulo,
            resumen: this.noticia.resumen,
            contenido: this.noticia.contenido,
            categoria: this.noticia.categoria,
            slug: slug,
            imagen: this.noticia.imagen
          },
          this.imagenFile || undefined
        );
        alert('✅ Noticia actualizada exitosamente');
      } else {
        await this.noticiasService.crearNoticia(
          {
            titulo: this.noticia.titulo,
            resumen: this.noticia.resumen,
            contenido: this.noticia.contenido,
            imagen: this.noticia.imagen,
            fecha: new Date(),
            slug: slug,
            autor: this.noticia.autor,
            categoria: this.noticia.categoria
          },
          this.imagenFile || undefined
        );
        alert('✅ Noticia publicada exitosamente');
      }
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      console.error('Error al guardar:', error);
      alert('❌ Error al guardar la noticia: ' + (error.message || 'Error desconocido'));
    } finally {
      this.guardando = false;
    }
  }

  cancelar() {
    if (confirm('¿Cancelar? Los cambios no guardados se perderán.')) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}

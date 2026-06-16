// src/app/core/services/noticias-firebase.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';

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
export class NoticiasFirebaseService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private noticiasSignal = signal<Noticia[]>([]);
  public noticias = this.noticiasSignal.asReadonly();

  async cargarNoticias() {
    try {
      console.log('Cargando noticias desde Firebase...');
      const noticiasRef = collection(this.firestore, 'noticias');
      const q = query(noticiasRef, orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);

      const noticias: Noticia[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        noticias.push({
          id: doc.id,
          titulo: data['titulo'],
          resumen: data['resumen'],
          contenido: data['contenido'],
          imagen: data['imagen'] || '',
          fecha: data['fecha'].toDate(),
          slug: data['slug'],
          autor: data['autor'] || 'Admin',
          categoria: data['categoria'] || 'Regional'
        });
      });

      this.noticiasSignal.set(noticias);
      console.log('Noticias cargadas:', noticias.length);
      return noticias;
    } catch (error) {
      console.error('Error al cargar noticias:', error);
      return [];
    }
  }

  async crearNoticia(noticia: Omit<Noticia, 'id'>, imagenFile?: File): Promise<string> {
    try {
      let imagen = noticia.imagen || '';

      if (imagenFile) {
        const storageRef = ref(this.storage, `noticias/${Date.now()}_${imagenFile.name}`);
        await uploadBytes(storageRef, imagenFile);
        imagen = await getDownloadURL(storageRef);
      }

      const noticiaData = {
        titulo: noticia.titulo,
        resumen: noticia.resumen,
        contenido: noticia.contenido,
        imagen: imagen,
        fecha: new Date(),
        slug: noticia.slug,
        autor: noticia.autor,
        categoria: noticia.categoria || 'Regional'
      };

      const noticiasRef = collection(this.firestore, 'noticias');
      const docRef = await addDoc(noticiasRef, noticiaData);
      await this.cargarNoticias();
      return docRef.id;
    } catch (error) {
      console.error('Error al crear noticia:', error);
      throw error;
    }
  }

  async actualizarNoticia(id: string, datos: Partial<Noticia>, nuevaImagen?: File): Promise<void> {
    try {
      let imagen = datos.imagen;

      if (nuevaImagen) {
        const storageRef = ref(this.storage, `noticias/${Date.now()}_${nuevaImagen.name}`);
        await uploadBytes(storageRef, nuevaImagen);
        imagen = await getDownloadURL(storageRef);
      }

      const noticiaRef = doc(this.firestore, 'noticias', id);
      await updateDoc(noticiaRef, { ...datos, imagen, fechaActualizacion: new Date() });
      await this.cargarNoticias();
    } catch (error) {
      console.error('Error al actualizar noticia:', error);
      throw error;
    }
  }

  async eliminarNoticia(id: string, imagenUrl?: string): Promise<void> {
    try {
      if (imagenUrl && imagenUrl.includes('firebasestorage')) {
        const imageRef = ref(this.storage, imagenUrl);
        await deleteObject(imageRef).catch(() => {});
      }
      const noticiaRef = doc(this.firestore, 'noticias', id);
      await deleteDoc(noticiaRef);
      await this.cargarNoticias();
    } catch (error) {
      console.error('Error al eliminar noticia:', error);
      throw error;
    }
  }

  async getNoticiaById(id: string): Promise<Noticia | null> {
    try {
      console.log('getNoticiaById - Buscando ID:', id);
      const noticias = this.noticiasSignal();
      console.log('getNoticiaById - Noticias en memoria:', noticias.length);
      const noticia = noticias.find(n => n.id === id);
      console.log('getNoticiaById - Encontrada:', !!noticia);
      return noticia || null;
    } catch (error) {
      console.error('Error en getNoticiaById:', error);
      return null;
    }
  }
}

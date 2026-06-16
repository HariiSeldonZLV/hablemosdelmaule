// src/app/core/services/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Reemplaza con tus credenciales reales
const firebaseConfig = {
  apiKey: "AIzaSyCz3Hun-u_3wnvtGRm-aO5ghqL49Zh9oW8",
  authDomain: "noticiasmaule-1eccc.firebaseapp.com",
  projectId: "noticiasmaule-1eccc",
  storageBucket: "noticiasmaule-1eccc.firebasestorage.app",
  messagingSenderId: "791674019649",
  appId: "1:791674019649:web:132f4402830594b0c04bc0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

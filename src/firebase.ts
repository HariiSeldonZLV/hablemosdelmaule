import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBg0rXVp9v-U47GskZNxdMD6GvuvXozgm8",
  authDomain: "noticiasmaule-90428.firebaseapp.com",
  projectId: "noticiasmaule-90428",
  storageBucket: "noticiasmaule-90428.firebasestorage.app",
  messagingSenderId: "964742064841",
  appId: "1:964742064841:web:951ce6d71933f33f337b18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
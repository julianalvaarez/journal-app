// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

// Configuración de Firebase para la aplicación.
const firebaseConfig = {
  apiKey: "AIzaSyD2xkjda3wpm_NBn-fOOuAa4_Tnh6UGAMA",
  authDomain: "journal-app-7da73.firebaseapp.com",
  projectId: "journal-app-7da73",
  storageBucket: "journal-app-7da73.appspot.com",
  messagingSenderId: "290891193348",
  appId: "1:290891193348:web:5cc332d0b1593d31b0a951"
};

// Inicializa la aplicación de Firebase.
export const FirebaseApp = initializeApp(firebaseConfig);

// Obtener instancias de servicios de Firebase.
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);


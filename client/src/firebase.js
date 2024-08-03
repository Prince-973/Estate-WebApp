// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f3a02.firebaseapp.com",
  projectId: "mern-estate-f3a02",
  storageBucket: "mern-estate-f3a02.appspot.com",
  messagingSenderId: "1013836527845",
  appId: "1:1013836527845:web:6b2a9d0f0c739ad56f3c0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

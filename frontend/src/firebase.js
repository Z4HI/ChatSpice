// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "chatspice-eb2ea.firebaseapp.com",
  projectId: "chatspice-eb2ea",
  storageBucket: "chatspice-eb2ea.firebasestorage.app",
  messagingSenderId: "595767011432",
  appId: "1:595767011432:web:475b063cf4477d705c73dd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

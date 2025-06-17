// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDg6J3_gHlIjpfFVe8VuqthApA87z_PVcw",
  authDomain: "zerocode-chat-fe.firebaseapp.com",
  projectId: "zerocode-chat-fe",
  storageBucket: "zerocode-chat-fe.firebasestorage.app",
  messagingSenderId: "483795838431",
  appId: "1:483795838431:web:2be43e789fa16fbdeb506a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

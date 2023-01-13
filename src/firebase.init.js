 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyClLcLL9pAiCoqrn2d0vrIz4xwbQQuMqVs",
  authDomain: "fir-auth-ts-e6de0.firebaseapp.com",
  projectId: "fir-auth-ts-e6de0",
  storageBucket: "fir-auth-ts-e6de0.appspot.com",
  messagingSenderId: "750123176271",
  appId: "1:750123176271:web:65bc4c6bc5f1a0a5db753a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
export default auth;
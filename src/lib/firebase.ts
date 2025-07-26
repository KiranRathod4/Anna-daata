// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "anna-daata-s3a55",
  "appId": "1:85928821034:web:a3c46f7fa0df582dad1e53",
  "storageBucket": "anna-daata-s3a55.firebasestorage.app",
  "apiKey": "AIzaSyCxp3XknJHlZLThqIUTu5ctjH9DlQreP-I",
  "authDomain": "anna-daata-s3a55.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "85928821034"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

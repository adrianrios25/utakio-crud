import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAZecMEORqzaZS7xvH9Dcbf5j1Uoc7g6cU",
  authDomain: "utak-io.firebaseapp.com",
  projectId: "utak-io",
  storageBucket: "utak-io.appspot.com",
  messagingSenderId: "812201594665",
  appId: "1:812201594665:web:a21540125606b146acf138",
  measurementId: "G-SWBCXHGS40",
  databaseURL: "https://utak-io-default-rtdb.asia-southeast1.firebasedatabase.app"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
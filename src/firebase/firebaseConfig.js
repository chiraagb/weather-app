// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "alpaago-b422c.firebaseapp.com",
  projectId: "alpaago-b422c",
  storageBucket: "alpaago-b422c.appspot.com",
  messagingSenderId: "478945214450",
  appId: "1:478945214450:web:28435cb8d034da9c46356b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

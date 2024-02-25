import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKypqPXOVR2XLn5KXFLglc3NgxrYfUfc0",
  authDomain: "noteballs-d7a7a.firebaseapp.com",
  projectId: "noteballs-d7a7a",
  storageBucket: "noteballs-d7a7a.appspot.com",
  messagingSenderId: "158852555164",
  appId: "1:158852555164:web:351d1fc6246cb33c942859",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm8xNLGo8pqNqftXT2sEfUYiCm2VYdErc",
  authDomain: "preppright-64c54.firebaseapp.com",
  projectId: "preppright-64c54",
  storageBucket: "preppright-64c54.appspot.com",
  messagingSenderId: "451868947921",
  appId: "1:451868947921:web:45c404721ee5137f489cf0",
  measurementId: "G-YM6LXJ9654"
};

  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

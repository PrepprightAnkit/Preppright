// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDgLds0Q0wFT0ZnN2GlBcZIxqan46V7fl4",
    authDomain: "prepright-ef54b.firebaseapp.com",
    databaseURL: "https://prepright-ef54b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "prepright-ef54b",
    storageBucket: "prepright-ef54b.appspot.com",
    messagingSenderId: "889921959980",
    appId: "1:889921959980:web:44e260b3a9f8724bddb989",
    measurementId: "G-6D2B8KMQ5X"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

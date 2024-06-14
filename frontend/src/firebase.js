// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChGvwMdy0JCWghJi9ZxRmSoL3vVlwJq_A",
    authDomain: "preppright.firebaseapp.com",
    projectId: "preppright",
    storageBucket: "preppright.appspot.com",
    messagingSenderId: "135679769410",
    appId: "1:135679769410:web:57d6f9f123372d6a29e6db",
    measurementId: "G-GF73XTM9MZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

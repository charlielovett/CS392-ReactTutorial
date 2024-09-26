// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPwao3DmcfOgoOd3-GyAmMapZNWXLhYhE",
  authDomain: "cs392-reacttutorial.firebaseapp.com",
  projectId: "cs392-reacttutorial",
  storageBucket: "cs392-reacttutorial.appspot.com",
  messagingSenderId: "103874154782",
  appId: "1:103874154782:web:8203f65eda2d504f26f90f",
  measurementId: "G-7ML9R8PVKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq0SGzTQCFYiFp1J74Ca_3DzllhQukvHU",
  authDomain: "sports-club-management-s-528cd.firebaseapp.com",
  projectId: "sports-club-management-s-528cd",
  storageBucket: "sports-club-management-s-528cd.firebasestorage.app",
  messagingSenderId: "569035523948",
  appId: "1:569035523948:web:1da9255dc3bcea419e9549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWu6zjWA42FizD4v8fw-t1yeegOdCA16M",
    authDomain: "e-commerce-34350.firebaseapp.com",
    projectId: "e-commerce-34350",
    storageBucket: "e-commerce-34350.appspot.com",
    messagingSenderId: "494457214625",
    appId: "1:494457214625:web:0c9cd2df5c7cbf311182e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


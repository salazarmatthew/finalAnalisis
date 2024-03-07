import firebase from "firebase/compat/app";
import { getFirestore } from '@firebase/firestore'
import "firebase/compat/auth";  

export const app = firebase.initializeApp({
  projectId: "react-7904d",
  appId: "1:938024851302:web:c121fbe58cc79e77091aa7",
  storageBucket: "react-7904d.appspot.com",
  apiKey: "AIzaSyAu3aeMQJ4hRQcwdH3Hlt5At-QDhFbiTQo",
  authDomain: "react-7904d.firebaseapp.com",
  messagingSenderId: "938024851302",
  measurementId: "G-5DC3G416WZ"
});

export const db = getFirestore(app)
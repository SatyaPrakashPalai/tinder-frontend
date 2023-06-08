
import 'firebase/firestore';
import {initializeApp} from "firebase/app"
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from "firebase/auth";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF7e_L0857Wp8XrtKGaOFgtnpj2WP5OEg",
  authDomain: "tinder-clone-2d336.firebaseapp.com",
  projectId: "tinder-clone-2d336",
  storageBucket: "tinder-clone-2d336.appspot.com",
  messagingSenderId: "1004897285432",
  appId: "1:1004897285432:web:5eaf9a6c77782cf436fdcd",
  measurementId: "G-892KSPBLC3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);


export {provider, auth};
export default db;


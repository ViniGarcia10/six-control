import { initializeApp } from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import * as db from "firebase/firestore";
import "firebase/storage";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBFYDdFFchajjmI-8pC4wAOnqjhPC6LVVQ",
  authDomain: "six-control.firebaseapp.com",
  projectId: "six-control",
  storageBucket: "six-control.appspot.com",
  messagingSenderId: "430987243318",
  appId: "1:430987243318:web:8acfe35c39f3ef26d04d97",
};

const app = initializeApp(firebaseConfig);

export const database = db.getFirestore(app);
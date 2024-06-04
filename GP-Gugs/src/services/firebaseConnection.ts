import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8cdmUMKV95zyXEitkFy6_N5BUTn3VaKs",
  authDomain: "react-routes-ad083.firebaseapp.com",
  projectId: "react-routes-ad083",
  storageBucket: "react-routes-ad083.appspot.com",
  messagingSenderId: "124111641167",
  appId: "1:124111641167:web:5bfef4e79515d48475683a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

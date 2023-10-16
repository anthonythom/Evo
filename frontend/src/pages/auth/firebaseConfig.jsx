import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

// credenciais do projeto
const firebaseConfig = {
  apiKey: "AIzaSyCRp9yhn1HfPj1yhoQsxLwfifblynDEtak",
  authDomain: "evopass-4d0d2.firebaseapp.com",
  projectId: "evopass-4d0d2",
  storageBucket: "evopass-4d0d2.appspot.com",
  messagingSenderId: "289413368452",
  appId: "1:289413368452:web:dab0100997a9ca9db910d1"
};

// iniciando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};


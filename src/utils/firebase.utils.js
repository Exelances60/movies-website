import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSUvrxu428-o1QBydB02s7qSDowhF4-Jw",
  authDomain: "fashion-app-a5a0c.firebaseapp.com",
  projectId: "fashion-app-a5a0c",
  storageBucket: "fashion-app-a5a0c.appspot.com",
  messagingSenderId: "804272618961",
  appId: "1:804272618961:web:751a157e0dcac9776f34f0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const createUserWithEmail = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithEmail = async (email, password) => {
  if (!email || !password) return;

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    return response;
  } catch ({ name, message }) {
    return message;
  }
};

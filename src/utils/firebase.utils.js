import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  addDoc,
  getDocs,
  where,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSUvrxu428-o1QBydB02s7qSDowhF4-Jw",
  authDomain: "fashion-app-a5a0c.firebaseapp.com",
  projectId: "fashion-app-a5a0c",
  storageBucket: "fashion-app-a5a0c.appspot.com",
  messagingSenderId: "804272618961",
  appId: "1:804272618961:web:751a157e0dcac9776f34f0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const createUserWithEmail = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithEmail = async (email, password) => {
  if (!email || !password) return;

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "local",
        email: user.email,
      });
    }
    return response;
  } catch ({ name, message }) {
    return message;
  }
};
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});
export const signInWithGooglePopup = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);

    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return res;
  } catch (error) {
    return error.message;
  }
};

export const signOutUser = async () => {
  return await signOut(auth);
};

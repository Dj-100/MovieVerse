import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDuyp4LakmAB0oiodHHzioQG9flMTQrr54",
  authDomain: "netflix-clone-18a87.firebaseapp.com",
  projectId: "netflix-clone-18a87",
  storageBucket: "netflix-clone-18a87.firebasestorage.app",
  messagingSenderId: "388022026151",
  appId: "1:388022026151:web:9fe2598147feae70620082"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return true; 
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "));
    return false; 
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true; 
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "));
    return false; 
  }
};

const logout = async ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}

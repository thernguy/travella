import { auth, db } from "@/firebaseConfig";
import { IUser } from "@/types/data";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    return user;
  } catch (err) {
    console.log("Login failed", err);
    return null;
  }
};

export const fetchAllOtherUsers = async (userId: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "!=", userId));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any;
  return users as IUser[];
};

export const searchUsersByName = async (name: string) => {
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("name", ">=", name),
    where("name", "<=", name + "\uf8ff")
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any;
  return users as IUser[];
};

export const saveUserToFirestore = async (user: User) => {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    name: user.displayName || "",
    avatar: user.photoURL || "",
  });
};

export const setUserOnline = (userId: string, state: 'online' | 'offline') => {
  const ref = doc(db, 'status', userId);
  return setDoc(ref, { state: state, last_changed: serverTimestamp() }, { merge: true });
};

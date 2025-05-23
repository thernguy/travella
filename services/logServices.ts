import { db } from "@/firebaseConfig";
import { LogFormData } from "@/types/data";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

export const createLog = async (log: LogFormData) => {
  const docRef = await addDoc(collection(db, "travelLogs"), {
    ...log,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getLogs = async (userId: string) => {
  const logsRef = collection(db, "travelLogs");
  const q = query(
    logsRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const logs: any[] = [];
  querySnapshot.forEach((doc) => {
    logs.push({ id: doc.id, ...doc.data() });
  });
  return logs;
};

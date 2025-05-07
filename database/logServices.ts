import { db } from "@/firebaseConfig";
import { LogFormData, LogType } from "@/types/data";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const createLog = async (log: LogFormData) => {
  const docRef = await addDoc(collection(db, "travelLogs"), {
    ...log,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getLogsForUser = async (userId: string) => {
  const data: any = [];

  return data;
};

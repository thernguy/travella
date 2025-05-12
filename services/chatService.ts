import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

export const getChatId = (uid1: string, uid2: string) => {
  return [uid1, uid2].sort().join("_");
};

export const sendMessage = async ({
  senderId,
  recipientId,
  message,
  messageType = "message",
  filePath = "",
}: {
  senderId: string;
  recipientId: string;
  message: string;
  messageType?: string;
  filePath?: string;
}) => {
  const chatId = getChatId(senderId, recipientId);
  const chatRef = collection(db, "chats", chatId, "messages");

  await addDoc(chatRef, {
    senderId,
    recipientId,
    message,
    messageType,
    filePath,
    status: "sent",
    createdAt: serverTimestamp(),
  });
};

export const subscribeToMessages = (
  senderId: string,
  recipientId: string,
  callback: (messages: any[]) => void
) => {
  const chatId = getChatId(senderId, recipientId);
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(msgs);
  });
};

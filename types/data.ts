import { Timestamp } from "firebase/firestore";

export type LogType = {
  id: string;
  createdAt: Timestamp;
  userId: string;
  location: string;
  notes: string;
  photos: string[];
};

export type LogFormData = {
  userId: string;
  location: string;
  notes: string;
  photos: string[];
};

export type IUser = {
  uid: string;
  email: string;
  name: string;
  avatar: string;
};
export type IMessage = {
  id: string;
  senderId: string;
  recipientId: string;
  message: string;
  messageType: "message" | "image" | "file";
  filePath?: string;
  createdAt: Timestamp;
  status: "sent" | "seen";
};

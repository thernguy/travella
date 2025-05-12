import { auth, db } from "@/firebaseConfig";
import { subscribeToMessages } from "@/services/chatService";
import { createLog, getLogs } from "@/services/logServices";
import {
  fetchAllOtherUsers,
  loginUser,
  saveUserToFirestore,
  searchUsersByName,
} from "@/services/userService";
import { IUser, LogFormData, LogType } from "@/types/data";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const user = await loginUser(email, password);
    setLoading(false);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user;
  };

  return { login, loading };
};
export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (name) {
        await updateProfile(userCred.user, { displayName: name });
        await saveUserToFirestore(userCred.user);
      }
      return userCred.user;
    } catch (err: any) {
      console.log("Registration error", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export const useGetLogs = (userId: string | undefined) => {
  const [data, setData] = useState<LogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    if (!userId) {
      setError("User ID is required");
      return;
    }
    try {
      const data = await getLogs(userId);
      setData(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    const logsRef = collection(db, "travelLogs");
    const q = query(
      logsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const logs: LogType[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LogType[];
        setData(logs);
        setLoading(false);
      },
      (err) => {
        console.error("Live fetch error:", err);
        setError("Live fetch failed");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { data, loading, error, fetch };
};

export const useCreateLog = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = async (log: LogFormData) => {
    try {
      const res = await createLog(log);
      setData((prev) => [...prev, { ...log, id: res }]);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, create };
};

export const useGetUsers = (userId?: string) => {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAllUsers = async () => {
    if (!userId) {
      return;
    }
    setLoading(true);
    const data = await fetchAllOtherUsers(userId);
    setData(data);
    setLoading(false);
  };

  const searchUsers = async (query: string) => {
    if (query.trim() === "") {
      await loadAllUsers();
    } else {
      setLoading(true);
      const results = await searchUsersByName(query);
      setData(results);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  return { data, loading, searchUsers };
};

export const useChatMessages = (senderId?: string, recipientId?: string) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!senderId || !recipientId) return;
    const unsubscribe = subscribeToMessages(senderId, recipientId, (msgs) => {
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [senderId, recipientId]);

  return messages;
};

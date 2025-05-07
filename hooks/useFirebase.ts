import { loginUser } from "@/services/firebase";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { getFeed } from "@/database/feedService";
import { Log } from "@/types/data";

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

export const useFeed = () => {
  const [data, setData] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      const data = await getFeed();
      setData(data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setError("Failed to fetch hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, fetch };
};

export const useCreateLog = (userId: string | undefined) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!userId) {
          setError("User ID is required");
          return;
        }
        // const data = await getLogsForUser(userId);
        // setData(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetch();
    }
  }, [userId]);

  return { data, loading, error };
};

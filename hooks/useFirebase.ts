import { loginUser } from "@/services/firebase";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebaseConfig";

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
      return {
        uid: userCred.user.uid,
        email: userCred.user.email,
        displayName: userCred.user.displayName,
      };
    } catch (err: any) {
      console.error("Registration error", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

import { User } from "@/types/data";
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const existingUser = await db.getFirstAsync(
    `
      SELECT name, email, id
      FROM users
      WHERE email = ?`,
    [email]
  );
  if (existingUser) {
    Alert.alert(
      "User already exists",
      "Please use a different email address.",
      [{ text: "OK" }]
    );
    return null;
  }
  await db.runAsync(
    `
      INSERT INTO users (email, password, name) 
      VALUES (?, ?, ?)`,
    [email, password, name]
  );
  const result = await db.getFirstAsync(
    `
      SELECT name, email, id
      FROM users
      WHERE email = ? AND password = ?`,
    [email, password]
  );
  if (!result) {
    throw new Error("Invalid email or password");
  }
  return result;
};

export const loginUser = async (email: string, password: string) => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const result = await db.getFirstAsync(
    `
      SELECT name, email, id
      FROM users
      WHERE email = ? AND password = ?`,
    [email, password]
  );
  return result as User;
};

export const getAllUsers = async () => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const result = await db.getAllAsync(
    `
      SELECT name, email, id
      FROM users`
  );
  return result as User[];
};

export const findUserByEmail = async (email: string) => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const result = await db.getFirstAsync(
    `
      SELECT name, email, id
      FROM users
      WHERE email = ?`,
    [email]
  );
  return result as User;
};

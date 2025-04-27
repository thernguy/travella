import * as SQLite from "expo-sqlite";

export const addUser = async (email: string, password: string) => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const result = await db.runAsync(
    `
      INSERT INTO users (email, password) 
      VALUES (?, ?)`,
    [email, password]
  );
  return result;
};

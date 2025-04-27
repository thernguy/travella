import { HOSPITALS_DATA, SERVICE_DATA } from "@/constants/data";
import * as SQLite from "expo-sqlite";

export const getHospitals = async () => {
  const db = await SQLite.openDatabaseAsync("booking-app.db");
  const hospitals = await db.getAllAsync(`
      SELECT * FROM hospitals;
    `);

  return hospitals;
};

export const getAllServices = async () => {
  const db = await SQLite.openDatabaseAsync("booking-app.db");
  const services = await db.getAllAsync(`
      SELECT * FROM services;
    `);

  return services;
};

export const getServicesById = async (hospitalId: number) => {
  if (!hospitalId) {
    return [];
  }
  const db = await SQLite.openDatabaseAsync("booking-app.db");
  const services = await db.getAllAsync(
    `
      SELECT * FROM services WHERE hospital_id = ?;
    `,
    [hospitalId]
  );

  return services as {
    id: number;
    hospital_id: number;
    title: string;
    price: number;
    description: string;
  }[];
};

import { HOSPITALS_DATA, SERVICE_DATA } from "@/constants/data";
import { Hospital, Service } from "@/types/hospitals";
import * as SQLite from "expo-sqlite";

export const getHospitals = async () => {
  const db = await SQLite.openDatabaseAsync("booking-app.db");
  const hospitals = await db.getAllAsync(`
      SELECT * FROM hospitals;
    `);

  return hospitals as Hospital[];
};

export const getAllServices = async () => {
  const db = await SQLite.openDatabaseAsync("booking-app.db");
  const services = await db.getAllAsync(
    `
      SELECT * FROM services;
    `,
    {
      useNewConnection: true,
    }
  );

  return services as Service[];
};

export const getServicesById = async (hospitalId: number) => {
  if (!hospitalId) {
    return [];
  }
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const services = await db.getAllAsync(
    `
      SELECT * FROM services WHERE hospital_id = ?;
    `,
    [hospitalId]
  );

  return services as Service[];
};

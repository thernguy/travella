import { HOSPITALS_DATA, SERVICE_DATA } from "@/constants/data";
import { Log, Service } from "@/types/data";
import * as SQLite from "expo-sqlite";

export const getFeed = async () => {
  const data: Log[] = [];

  return data;
};

export const getAllServices = async () => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
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

export const getLogById = async (logId: string) => {
  if (!logId) {
    return [];
  }
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const services = await db.getAllAsync(
    `
      SELECT * FROM services WHERE hospital_id = ?;
    `,
    [logId]
  );

  return services as Service[];
};

export const getServiceById = async (serviceId: number) => {
  if (!serviceId) {
    return null;
  }
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const service = await db.getAllAsync(
    `
      SELECT s.*, h.name as hospital_name, h.location as hospital_location FROM services s
      JOIN hospitals h ON s.hospital_id = h.id
      WHERE s.id = ?;
    `,
    [serviceId]
  );

  return service[0] as Service;
};

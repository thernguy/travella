import { HOSPITALS_DATA, SERVICE_DATA } from "@/constants/data";
import * as SQLite from "expo-sqlite";

export const initDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("booking-app.db", {
      useNewConnection: true,
    });
    await seedHospitals(db);
    await seedServices(db);
    await seedBookings(db);
    await seedUsers(db);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing the database: ", error);
  }
};

const seedHospitals = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    -- Create Hospitals table
    CREATE TABLE IF NOT EXISTS hospitals (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      logo TEXT,
      location TEXT
    );`);

  const hospitals = await db.getAllAsync(`
    SELECT * FROM hospitals;
  `);

  if (hospitals.length === 0) {
    for (const hospital of HOSPITALS_DATA) {
      await db.runAsync(
        "INSERT INTO hospitals (name, logo, location) VALUES (?, ?, ?)",
        hospital.name,
        hospital.logo,
        hospital.location
      );
    }
  }
};

const seedServices = async (db: SQLite.SQLiteDatabase) => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      -- Create Services table
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY NOT NULL,
        hospital_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        FOREIGN KEY (hospital_id) REFERENCES hospitals (id)
      );
    `);

    const services = await db.getAllAsync(`
      SELECT *  FROM services;
    `);
    if (services.length > 0) {
      return;
    }
    const hospitals = (await db.getAllAsync(
      "SELECT id FROM hospitals"
    )) as any[];

    for (const hospital of hospitals) {
      // Randomly pick 5-8 services for each hospital
      const shuffledServices = [...SERVICE_DATA].sort(
        () => 0.5 - Math.random()
      );
      const selectedServices = shuffledServices.slice(
        0,
        Math.floor(Math.random() * 4) + 5
      );

      for (const service of selectedServices) {
        await db.runAsync(
          "INSERT INTO services (hospital_id, title, price, description) VALUES (?, ?, ?, ?)",
          hospital.id,
          service.title,
          service.price,
          service.description
        );
      }
    }
  } catch (error) {
    console.error("Error seeding services: ", error);
  }
};

const seedBookings = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    -- Create Bookings table
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY NOT NULL,
      user_id INTEGER NOT NULL,
      service_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      notes TEXT,
      FOREIGN KEY (service_id) REFERENCES services (id)
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);
};

const seedUsers = async (db: SQLite.SQLiteDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    -- Create Users table
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      photo TEXT 
    );
  `);
};

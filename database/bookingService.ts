import * as SQLite from "expo-sqlite";

export const createBooking = async (
  userId: number,
  serviceId: number,
  date: Date,
  time: Date,
  notes: string
) => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const result = await db.runAsync(
    `
      INSERT INTO bookings (user_id, service_id, date, time, notes) 
      VALUES (?, ?, ?, ?, ?)`,
    [userId, serviceId, date.toISOString(), time.toISOString(), notes]
  );
  return result;
};

export const getBookingsForUser = async (userId: number) => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const data = await db.getAllAsync(
    `
    SELECT b.*, s.title AS service_title, h.name AS hospital_name, h.location
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    JOIN hospitals h ON s.hospital_id = h.id
    WHERE b.user_id = ?
    ORDER BY b.date DESC, b.time DESC
  `,
    [userId]
  );
  console.log("Bookings for user:", data);

  return data;
};

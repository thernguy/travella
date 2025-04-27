import * as SQLite from "expo-sqlite";

export const bookAppointment = async (
  userId: number,
  serviceId: number,
  date: Date
) => {
  const db = await SQLite.openDatabaseAsync("booking-app.db", {
    useNewConnection: true,
  });
  const result = await db.runAsync(
    `
      INSERT INTO bookings (user_id, service_id, date) 
      VALUES (?, ?, ?)`,
    [userId, serviceId, date.toISOString()]
  );
  return result;
};

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

// export const getBookingsForUser = async (userId: number) => {
//   const db = await SQLite.openDatabaseAsync("booking-app.db", {
//     useNewConnection: true,
//   });
//   const bookings = await db.getAllAsync(
//     `
//       SELECT b.id, s.title, b.date FROM bookings b
//       JOIN services s ON b.service_id = s.id
//       WHERE b.user_id = ?;
//     `,
//     [userId]
//   );
//   return bookings;
// };

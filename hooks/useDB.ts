import { createLog, getLogsForUser } from "@/database/logServices";
import {
  getFeed,
  getServiceById,
  getLogById,
} from "@/database/feedService";
import { loginUser, registerUser } from "@/database/userService";
import { Log, Service, User } from "@/types/data";
import { useEffect, useState } from "react";

export const useLogs = () => {
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

export const useServices = (logId: string) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getLogById(logId);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    if (logId) {
      fetchServices();
    }
  }, [logId]);

  return { services, loading, error };
};

export const useService = (serviceId: number) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(serviceId);
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
        setError("Failed to fetch service");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  return { service, loading, error };
};

export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const create = async (
    userId: number,
    serviceId: number,
    date: Date,
    time: Date,
    notes: string
  ) => {
    setLoading(true);
    const booking = await createLog(userId, serviceId, date, time, notes);
    setLoading(false);
    if (!booking) {
      setError("Failed to create booking");
      return null;
    }
    setSuccess(true);
    setError(null);
    return booking;
  };

  return { create, loading, error, success };
};

export const useUserLogs = (userId: string | undefined) => {
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
        const data = await getLogsForUser(userId);
        setData(data);
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

  return { bookings: data, loading, error };
};



// export const useBookings = (userId: number) => {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const data = await getBookingsForUser(userId);
//         setBookings(data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         setError("Failed to fetch bookings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchBookings();
//     }
//   }, [userId]);

//   return { bookings, loading, error };
// };

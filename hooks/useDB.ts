import { createBooking } from "@/database/bookingService";
import {
  getHospitals,
  getServiceById,
  getServicesById,
} from "@/database/hospitalService";
import { loginUser, registerUser } from "@/database/userService";
import { Hospital, Service, User } from "@/types/hospitals";
import { useEffect, useState } from "react";

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getHospitals();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setError("Failed to fetch hospitals");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return { hospitals, loading, error };
};

export const useServices = (hospitalId: number) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesById(hospitalId);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      fetchServices();
    }
  }, [hospitalId]);

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

  const create = async (
    userId: number,
    serviceId: number,
    date: Date,
    time: Date,
    notes: string
  ) => {
    setLoading(true);
    try {
      createBooking(userId, serviceId, date, time, notes);
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    const user = await registerUser(email, password, name);
    setLoading(false);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user as User;
  };

  return { register, loading };
};
export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const user = await loginUser(email, password);
    setLoading(false);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user as User;
  };

  return { login, loading };
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

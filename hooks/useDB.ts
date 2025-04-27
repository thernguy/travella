import { useEffect, useState } from "react";
import { Hospital, Service } from "@/types/hospitals";
import { getHospitals, getServicesById } from "@/database/hospitalService";

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


export type Hospital = {
  id: number;
  name: string;
  logo: string;
  location: string;
};

export type Service = {
  id: number;
  hospital_id: number;
  title: string;
  price: number;
  description: string;
  hospital_name?: string;
  hospital_logo?: string;
  hospital_location?: string;
};

export type Booking = {
  id: number;
  service_id: number;
  date: string;
  time: string;
  name: string;
  phone: string;
  user_id: number;
};

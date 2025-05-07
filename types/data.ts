export type Log = {
  id: string;
  name: string;
  logo: string;
  location: string;
};

export type Service = {
  id: string;
  hospital_id: number;
  title: string;
  price: number;
  description: string;
  hospital_name?: string;
  hospital_logo?: string;
  hospital_location?: string;
};

export type Booking = {
  id: string;
  service_id: number;
  date: string;
  time: string;
  name: string;
  phone: string;
  user_id: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

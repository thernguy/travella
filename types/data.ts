export type LogType = {
  id: string;
  createdAt: string;
  userId: string;
  location: string;
  notes: string;
  photos: string[];
};

export type LogFormData = {
  userId: string;
  location: string;
  notes: string;
  photos: string[];
};

export type User = {
  id: string;
  email: string;
  name: string;
};

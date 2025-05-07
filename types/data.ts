export type LogType = {
  userId: string;
  location: string;
  notes: string;
  photos: string[];
};

export type LogFormData = {
  location: string;
  notes: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

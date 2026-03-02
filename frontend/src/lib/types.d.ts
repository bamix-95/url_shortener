export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type shortenUrl = {
  shortCode: string;
  shortUrl: string;
};

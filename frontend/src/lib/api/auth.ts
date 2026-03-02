import { axiosClient } from "../axios";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axiosClient.post("/auth/register", payload);
  return res.data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await axiosClient.post("/auth/login", payload);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosClient.post("/auth/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axiosClient.get("/auth/me");
  return res.data;
};

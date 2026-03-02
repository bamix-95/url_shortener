import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("No value provided for API_URL");
}

export const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

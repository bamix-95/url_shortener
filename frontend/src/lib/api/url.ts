import { axiosClient } from "../axios";

export const shortenLongUrl = async (payload: { longUrl: string }) => {
  const res = await axiosClient.post("/url/shorten", payload);
  return res.data;
};

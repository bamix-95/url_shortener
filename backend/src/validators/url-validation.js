import { z } from "zod";

export const shortenUrlSchema = z.object({
  longUrl: z.string().url("Please enter a valid URL."),
});

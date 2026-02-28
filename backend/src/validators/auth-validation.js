import { z } from "zod";

const emailSchema = z
  .string()
  .nonempty("Email is required")
  .email("Please provide a valid email address")
  .trim();

const passwordSchema = z
  .string()
  .nonempty("Password is required")
  .trim()
  .min(6, "Password cannot be less than 3 characters");

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .trim()
    .min(3, "Name cannot be less than 3 characters.")
    .max(255, "Name cannot exceed 255 characters."),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

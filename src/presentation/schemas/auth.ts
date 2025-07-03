import { z } from "zod";
import { emailSchema, passwordSchema } from "./shared";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const tokenSchema = z
  .string()
  .regex(
    /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/,
    "Invalid jwt token"
  );

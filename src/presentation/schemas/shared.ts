import { z } from "zod";

export const idSchema = z.coerce.number();
export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8);
export const nameSchema = z.string().min(2);

import { z } from "zod";
import { emailSchema, idSchema, nameSchema, passwordSchema } from "./shared";

export const slugSchema = z.string().regex(/^@[a-zA-Z0-9_]+-[a-zA-Z0-9]+$/);
export const profilePictureSchema = z.string().url().optional();
export const profileBgSchema = z.string().url().optional();

export const baseIdField = {
  id: idSchema,
};

export const createUserSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
  slug: slugSchema.optional(),
  profile_picture: profilePictureSchema,
  profile_bg: profileBgSchema,
});

export const updateUserEmailSchema = z.object({
  ...baseIdField,
  email: emailSchema,
  password: passwordSchema,
});

export const updateUserPasswordSchema = z.object({
  ...baseIdField,
  password: passwordSchema,
});

export const updateUserNameSchema = z.object({
  ...baseIdField,
  name: nameSchema,
});

export const updateUserProfilePictureSchema = z.object({
  ...baseIdField,
  profile_picture: profilePictureSchema,
  password: passwordSchema,
});

export const updateUserProfileBgSchema = z.object({
  ...baseIdField,
  profile_bg: profileBgSchema,
  password: passwordSchema,
});

import { z } from "zod";
import { idSchema } from "./shared";

export const contentSchema = z.string().min(1).max(280);
export const imageSchema = z.string().url().optional();

export const createPostSchema = z.object({
  content: contentSchema,
  image: imageSchema,
});

export const likePostSchema = z.object({
  post_id: idSchema,
  user_id: idSchema,
});

export const unlikePostSchema = z.object({
  post_id: idSchema,
  user_id: idSchema,
});

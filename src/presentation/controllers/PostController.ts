import { Request, Response } from "express";
import { errorHandler } from "../helpers/errorHandler";
import CreatePostUseCase from "../../application/useCases/Post/CreatePostUseCase";
import DeletePostUseCase from "../../application/useCases/Post/DeletePostUseCase";
import LikePostUseCase from "../../application/useCases/Post/LikePostUseCase";
import UnlikePostUseCase from "../../application/useCases/Post/UnlikePostUseCase";
import { container } from "tsyringe";
import { zodSchemaHandler } from "../helpers/schemaHandler";
import { idSchema } from "../schemas/shared";
import {
  createPostSchema,
  likePostSchema,
  unlikePostSchema,
} from "../schemas/post";
import { FindPostsByUserSlugUseCase } from "../../application/useCases/Post/FindPostsByUserSlugUseCase";
import { FindPostByIdUseCase } from "../../application/useCases/Post/FindPostByIdUseCase";
import { slugSchema } from "../schemas/user";
import { FindPostsByContentUseCase } from "../../application/useCases/Post/FindPostsByContentUseCase";

class PostController {
  static async create(req: Request, res: Response) {
    try {
      const { user_id, content, image } = zodSchemaHandler(
        createPostSchema,
        req.body
      );

      const created = await container
        .resolve(CreatePostUseCase)
        .execute(user_id, content, image);
      res.status(201).json(created);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = zodSchemaHandler(idSchema, req.params.id);

      const deleted = await container.resolve(DeletePostUseCase).execute(id);
      res.status(200).json(deleted);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async like(req: Request, res: Response) {
    try {
      const { post_id, user_id } = zodSchemaHandler(likePostSchema, req.body);

      const liked = await container
        .resolve(LikePostUseCase)
        .execute(post_id, user_id);
      res.status(200).json(liked);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async unlike(req: Request, res: Response) {
    try {
      const { post_id, user_id } = zodSchemaHandler(unlikePostSchema, req.body);

      const unliked = await container
        .resolve(UnlikePostUseCase)
        .execute(post_id, user_id);
      res.status(200).json(unliked);

      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = zodSchemaHandler(idSchema, req.params.id);

      const post = await container.resolve(FindPostByIdUseCase).execute(id);
      res.status(200).json(post);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }
  static async findByUserSlug(req: Request, res: Response) {
    try {
      const { slug } = zodSchemaHandler(slugSchema, req.params.slug);

      const posts = await container
        .resolve(FindPostsByUserSlugUseCase)
        .execute(slug);
      res.status(200).json(posts);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async FindByContent(req: Request, res: Response) {
    try {
      const { content } = zodSchemaHandler(idSchema, req.params.content);

      const posts = await container
        .resolve(FindPostsByContentUseCase)
        .execute(content);
      res.status(200).json(posts);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }
}

export default PostController;

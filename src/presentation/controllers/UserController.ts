import { Request, Response } from "express";
import { zodSchemaHandler } from "../helpers/schemaHandler";
import CreateUserUseCase from "../../application/useCases/User/CreateUserUseCase";
import { errorHandler } from "../helpers/errorHandler";
import DeleteUserUseCase from "../../application/useCases/User/DeleteUserUseCase";
import UpdateUserEmailUseCase from "../../application/useCases/User/UpdateUserEmailUseCase";
import UpdateUserNameUseCase from "../../application/useCases/User/UpdateUserNameUseCase";
import UpdateUserPasswordUseCase from "../../application/useCases/User/UpdateUserPasswordUseCase";
import UpdateUserProfileBgUseCase from "../../application/useCases/User/UpdateUserProfileBgUseCase";
import UpdateUserProfilePictureUseCase from "../../application/useCases/User/UpdateUserProfilePictureUseCase";
import {
  createUserSchema,
  updateUserNameSchema,
  updateUserProfileBgSchema,
  updateUserProfilePictureSchema,
} from "../schemas/user";
import { container } from "tsyringe";
import { idSchema } from "../schemas/shared";

class UserController {
  static async create(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Missing request body");

      const { email, name, password } = zodSchemaHandler(
        createUserSchema,
        req.body
      );
      const created = await container
        .resolve(CreateUserUseCase)
        .execute(email, password, name);

      res.status(201).json(created);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Missing request body");

      const { id } = zodSchemaHandler(idSchema, req.body.id);
      const deleted = await container.resolve(DeleteUserUseCase).execute(id);
      res.status(200).json(deleted);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async changeProfileBg(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Missing request body");

      const { id, profile_bg, password } = zodSchemaHandler(
        updateUserProfileBgSchema,
        req.body.id
      );

      const updated = await container
        .resolve(UpdateUserProfileBgUseCase)
        .execute(id, profile_bg, password);
      res.status(200).json(updated);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async changeProfilePicture(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Missing request body");

      const { id, profile_picture } = zodSchemaHandler(
        updateUserProfilePictureSchema,
        req.body
      );
      const updated = await container
        .resolve(UpdateUserProfilePictureUseCase)
        .execute(id, profile_picture);
      res.status(200).json(updated);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async changeName(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Missing request body");

      const { id, name, password } = zodSchemaHandler(
        updateUserNameSchema,
        req.body
      );

      const updated = await container
        .resolve(UpdateUserNameUseCase)
        .execute(id, name, password);
      res.status(200).json(updated);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async changeEmail(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Missing request body");

      const { id, email, password } = zodSchemaHandler(
        updateUserNameSchema,
        req.body
      );

      const updated = await container
        .resolve(UpdateUserEmailUseCase)
        .execute(id, email, password);

      res.status(200).json(updated);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Missing request body");

      const { id, password } = zodSchemaHandler(updateUserNameSchema, req.body);

      const updated = await container
        .resolve(UpdateUserPasswordUseCase)
        .execute(id, password);
      res.status(200).json(updated);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }
}

export default UserController;

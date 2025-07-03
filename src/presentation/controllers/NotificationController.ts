import { container } from "tsyringe";
import { zodSchemaHandler } from "../helpers/schemaHandler";
import { idSchema } from "../schemas/shared";
import { errorHandler } from "../helpers/errorHandler";
import GetNotificationsUseCase from "../../application/useCases/Notifications/GetNotificationsUseCase";
import { Request, Response } from "express";
import ReadAllNotificationsUseCase from "../../application/useCases/Notifications/ReadAllNotificationsUseCase";
import DeleteAllNotificationsUseCase from "../../application/useCases/Notifications/DeleteAllNotificationsUseCase";
import ReadNotificationUseCase from "../../application/useCases/Notifications/ReadNotificationUseCase";
import DeleteNotificationUseCase from "../../application/useCases/Notifications/DeleteNotificationUseCase";

class NotificationController {
  static async getAll(req: Request, res: Response) {
    try {
      const { user_id } = zodSchemaHandler(idSchema, req.body);

      const notifications = await container
        .resolve(GetNotificationsUseCase)
        .execute(user_id);
      res.status(200).json({ notifications });
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }
  static async readAll(req: Request, res: Response) {
    try {
      const { user_id } = zodSchemaHandler(idSchema, req.body);

      const notifications = await container
        .resolve(ReadAllNotificationsUseCase)
        .execute(user_id);
      res.status(200).json({ notifications });
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }
  static async deleteAll(req: Request, res: Response) {
    try {
      const { user_id } = zodSchemaHandler(idSchema, req.body);

      await container.resolve(DeleteAllNotificationsUseCase).execute(user_id);
      res.status(200).json({ message: "Notifications deleted" });
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async deleteOne(req: Request, res: Response) {
    try {
      const { user_id, id } = zodSchemaHandler(idSchema, req.body);

      const notification = await container
        .resolve(DeleteNotificationUseCase)
        .execute(user_id, id);
      res.status(200).json(notification);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }

  static async readOne(req: Request, res: Response) {
    try {
      const { user_id, id } = zodSchemaHandler(idSchema, req.body);

      const notification = await container
        .resolve(ReadNotificationUseCase)
        .execute(user_id, id);
      res.status(200).json(notification);
      return;
    } catch (error) {
      errorHandler(error, res);
      return;
    }
  }
}

export default NotificationController;

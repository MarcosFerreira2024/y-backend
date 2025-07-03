import { Router } from "express";
import NotificationController from "../controllers/NotificationController";

const notification_routes = Router();

notification_routes.get("/", NotificationController.getAll);
notification_routes.delete("/:id", NotificationController.deleteOne);
notification_routes.delete("/", NotificationController.deleteAll);
notification_routes.put("/", NotificationController.readAll);
notification_routes.put("/:id", NotificationController.readOne);

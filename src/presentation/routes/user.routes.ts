import { Router } from "express";
import UserController from "../controllers/UserController";

const user_routes = Router();

user_routes.put(
  "/user/:id/profile_picture",
  UserController.changeProfilePicture
);
user_routes.put("/user/:id/profile_bg", UserController.changeProfileBg);
user_routes.put("/user/:id/email", UserController.changeEmail);
user_routes.put("/user/:id/name", UserController.changeName);
user_routes.put("/user/:id/password", UserController.changePassword);
user_routes.delete("/user/:id", UserController.delete);

export { user_routes };

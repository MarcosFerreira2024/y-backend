import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";

const auth_routes = Router();

auth_routes.post("/register", UserController.create);
auth_routes.post("/login", AuthController.login);
auth_routes.post("/verify-token", AuthController.verifyToken);

export { auth_routes };

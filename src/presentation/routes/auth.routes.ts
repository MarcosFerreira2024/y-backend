import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";

const auth_routes = Router();

auth_routes.post("/register", UserController.create);
auth_routes.post("/login", AuthController.login);

export { auth_routes };

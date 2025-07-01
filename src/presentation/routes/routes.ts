import { Router } from "express";
import { user_routes } from "./user.routes";
import { post_routes } from "./post.routes";
import { auth_routes } from "./auth.routes";

const routes = Router();

routes.use("/users", user_routes);
routes.use("/auth", auth_routes);
routes.use("/posts", post_routes);

export { routes };

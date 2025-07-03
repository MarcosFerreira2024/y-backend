import { Router } from "express";
import PostController from "../controllers/PostController";
import middleware from "../../infrastructure/middleware/middleware";

const post_routes = Router();

post_routes.use(middleware);
post_routes.post("/", PostController.create);
post_routes.delete("/:id", PostController.delete);
post_routes.put("/:id/like", PostController.like);
post_routes.put("/:id/unlike", PostController.unlike);
post_routes.get("/:id", PostController.findById);
post_routes.get("/user/:slug", PostController.findByUserSlug);
post_routes.get("/content/:content", PostController.FindByContent);

export { post_routes };

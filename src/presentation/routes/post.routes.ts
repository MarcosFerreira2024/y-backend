import { Router } from "express";
import PostController from "../controllers/PostController";

const post_routes = Router();

post_routes.post("/posts", PostController.create);
post_routes.delete("/posts/:id", PostController.delete);
post_routes.post("/posts/:id/like", PostController.like);
post_routes.delete("/posts/:id/like", PostController.unlike);

export { post_routes };

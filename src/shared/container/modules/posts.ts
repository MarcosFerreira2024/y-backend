import { container } from "tsyringe";
import PostRepository from "../../../infrastructure/repositories/PostRepository";
import IPostRepository from "../../../domain/repositories/IPostRepository";
import CreatePostUseCase from "../../../application/useCases/Post/CreatePostUseCase";
import DeletePostUseCase from "../../../application/useCases/Post/DeletePostUseCase";
import LikePostUseCase from "../../../application/useCases/Post/LikePostUseCase";
import UnlikePostUseCase from "../../../application/useCases/Post/UnlikePostUseCase";

container.registerSingleton<IPostRepository>("PostRepository", PostRepository);

container.registerSingleton(CreatePostUseCase);
container.registerSingleton(DeletePostUseCase);
container.registerSingleton(LikePostUseCase);
container.registerSingleton(UnlikePostUseCase);

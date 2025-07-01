import { container } from "tsyringe";
import IUserRepository from "../../../domain/repositories/IUserRepository";
import UserRepository from "../../../infrastructure/repositories/UserRepository";
import DeleteUserUseCase from "../../../application/useCases/User/DeleteUserUseCase";
import UpdateUserEmailUseCase from "../../../application/useCases/User/UpdateUserEmailUseCase";
import UpdateUserNameUseCase from "../../../application/useCases/User/UpdateUserNameUseCase";
import UpdateUserPasswordUseCase from "../../../application/useCases/User/UpdateUserPasswordUseCase";
import UpdateUserProfileBgUseCase from "../../../application/useCases/User/UpdateUserProfileBgUseCase";
import UpdateUserProfilePictureUseCase from "../../../application/useCases/User/UpdateUserProfilePictureUseCase";
import CreateUserUseCase from "../../../application/useCases/User/CreateUserUseCase";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton(DeleteUserUseCase);
container.registerSingleton(UpdateUserEmailUseCase);
container.registerSingleton(UpdateUserNameUseCase);
container.registerSingleton(UpdateUserPasswordUseCase);
container.registerSingleton(UpdateUserProfileBgUseCase);
container.registerSingleton(UpdateUserProfilePictureUseCase);
container.registerSingleton(CreateUserUseCase);

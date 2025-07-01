import { container } from "tsyringe";
import PasswordService from "../../../infrastructure/services/PasswordService";
import IPasswordService from "../../../domain/services/IPasswordService";
import IPasswordHasher from "../../../domain/repositories/IPasswordHasher";
import BcryptPasswordHasher from "../../../infrastructure/libs/bcrypt/BcryptPasswordHasher";

container.registerSingleton<IPasswordService>(
  "PasswordService",
  PasswordService
);

container.registerSingleton<IPasswordHasher>(
  "PasswordHasher",
  BcryptPasswordHasher
);

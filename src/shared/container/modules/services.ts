import { container } from "tsyringe";
import PasswordService from "../../../infrastructure/services/PasswordService";
import IPasswordService from "../../../domain/services/IPasswordService";
import IPasswordHasher from "../../../domain/repositories/IPasswordHasher";
import BcryptPasswordHasher from "../../../infrastructure/libs/bcrypt/BcryptPasswordHasher";
import INotificationService from "../../../domain/services/INotificationService";
import NotificationService from "../../../infrastructure/services/NotificationService";
import IFriendshipService from "../../../domain/services/IFriendshipService";
import FriendshipService from "../../../infrastructure/services/FriendshipService";

container.registerSingleton<IPasswordService>(
  "PasswordService",
  PasswordService
);

container.registerSingleton<IPasswordHasher>(
  "PasswordHasher",
  BcryptPasswordHasher
);

container.registerSingleton<INotificationService>(
  "NotificationService",
  NotificationService
);

container.registerSingleton<IFriendshipService>(
  "FriendshipService",
  FriendshipService
);

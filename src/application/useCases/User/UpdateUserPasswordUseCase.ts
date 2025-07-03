import IUserRepository, {
  UserData,
} from "../../../domain/repositories/IUserRepository";
import IPasswordHasher from "../../../domain/repositories/IPasswordHasher";
import PasswordService from "../../../infrastructure/services/PasswordService";
import Password from "../../../domain/value-objects/Password";
import IPasswordService from "../../../domain/services/IPasswordService";
import { inject, injectable } from "tsyringe";
import INotificationService from "../../../domain/services/INotificationService";
import Name from "../../../domain/value-objects/Name";
import { emitNotification } from "../../../infrastructure/helper/emitNotification";

@injectable()
class UpdateUserPasswordUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordService") private passwordService: IPasswordService,
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(
    id: number,
    password: string
  ): Promise<Omit<UserData, "password">> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");

    await this.passwordService.compareAndThrowError(password, user.password);

    const hashedPassword = (
      await this.passwordService.create(password)
    ).getPassword();

    const updated = await this.userRepository.updatePassword(
      id,
      hashedPassword
    );
    const notification = await this.notificationService.create(
      id,
      `${Name.formatter(
        Name.formatter(user.name)
      )} your password has been updated`,
      "PASSWORD_CHANGED"
    );

    await emitNotification(notification, id);

    return updated;
  }
}

export default UpdateUserPasswordUseCase;

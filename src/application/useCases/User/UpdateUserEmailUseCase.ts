import { inject, injectable } from "tsyringe";
import IUserRepository, {
  UserData,
} from "../../../domain/repositories/IUserRepository";
import IPasswordService from "../../../domain/services/IPasswordService";
import INotificationService from "../../../domain/services/INotificationService";
import Name from "../../../domain/value-objects/Name";
import { getSocketInstance } from "../../../infrastructure/configs/socket/socketInstance";
import { emitNotification } from "../../../infrastructure/helper/emitNotification";

@injectable()
class UpdateUserEmailUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordService") private passwordService: IPasswordService,
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(
    id: number,
    email: string,
    password: string
  ): Promise<Omit<UserData, "password">> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.passwordService.compareAndThrowError(password, user.password);

    const updated = await this.userRepository.updateEmail(id, email);

    const notification = await this.notificationService.create(
      id,
      `${Name.formatter(user.name)} your email has been updated`,
      "EMAIL_CHANGED"
    );

    await emitNotification(notification, id);

    return updated;
  }
}

export default UpdateUserEmailUseCase;

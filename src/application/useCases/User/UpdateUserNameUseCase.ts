import { inject, injectable } from "tsyringe";
import IUserRepository, {
  UserData,
} from "../../../domain/repositories/IUserRepository";
import INotificationService from "../../../domain/services/INotificationService";
import { emitNotification } from "../../../infrastructure/helper/emitNotification";
import Name from "../../../domain/value-objects/Name";

@injectable()
class UpdateUserNameUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(
    id: number,
    name: string,
    password: string
  ): Promise<Omit<UserData, "password">> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updated = await this.userRepository.updateName(id, name);

    const notification = await this.notificationService.create(
      id,
      `${Name.formatter(user.name)} your name has been updated`,
      "NAME_CHANGED"
    );

    await emitNotification(notification, id);

    return updated;
  }
}

export default UpdateUserNameUseCase;

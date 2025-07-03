import { inject, injectable } from "tsyringe";
import IUserRepository, {
  UserData,
} from "../../../domain/repositories/IUserRepository";
import INotificationService from "../../../domain/services/INotificationService";
import Name from "../../../domain/value-objects/Name";
import { emitNotification } from "../../../infrastructure/helper/emitNotification";
@injectable()
class UpdateUserProfileBgUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(
    id: number,
    profileBg: string,
    password: string
  ): Promise<Omit<UserData, "password">> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updated = await this.userRepository.updateProfileBg(id, profileBg);
    const notification = await this.notificationService.create(
      id,
      `${Name.formatter(
        user.name
      )} your background profile picture has been updated`,
      "PROFILEBG_CHANGED"
    );

    await emitNotification(notification, id);
    return updated;
  }
}

export default UpdateUserProfileBgUseCase;

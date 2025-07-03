import { inject, injectable } from "tsyringe";
import INotificationService from "../../../domain/services/INotificationService";

@injectable()
class DeleteAllNotificationsUseCase {
  constructor(
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(user_id: number): Promise<void> {
    await this.notificationService.deleteAll(user_id);
  }
}

export default DeleteAllNotificationsUseCase;

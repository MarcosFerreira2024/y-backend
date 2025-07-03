import { inject, injectable } from "tsyringe";
import INotificationService from "../../../domain/services/INotificationService";

@injectable()
class DeleteNotificationUseCase {
  constructor(
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(user_id: number, notification_id: number): Promise<void> {
    await this.notificationService.delete(notification_id, user_id);
  }
}

export default DeleteNotificationUseCase;

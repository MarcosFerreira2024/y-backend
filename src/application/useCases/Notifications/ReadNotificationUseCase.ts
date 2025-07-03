import { inject, injectable } from "tsyringe";
import INotificationService, {
  NotificationsData,
} from "../../../domain/services/INotificationService";

@injectable()
class ReadNotificationUseCase {
  constructor(
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(
    user_id: number,
    notification_id: number
  ): Promise<NotificationsData> {
    return await this.notificationService.markAsRead(notification_id, user_id);
  }
}

export default ReadNotificationUseCase;

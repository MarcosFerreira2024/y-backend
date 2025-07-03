import { inject, injectable } from "tsyringe";
import INotificationService, {
  NotificationsData,
} from "../../../domain/services/INotificationService";

@injectable()
class ReadAllNotificationsUseCase {
  constructor(
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(user_id: number): Promise<NotificationsData[]> {
    return await this.notificationService.markAllAsRead(user_id);
  }
}

export default ReadAllNotificationsUseCase;

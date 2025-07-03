import { inject, injectable } from "tsyringe";
import INotificationService, {
  NotificationsData,
} from "../../../domain/services/INotificationService";

@injectable()
class GetNotificationsUseCase {
  constructor(
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(user_id: number): Promise<NotificationsData[]> {
    const notifications = await this.notificationService.getAll(user_id);
    if (!notifications) return [];
    return notifications;
  }
}

export default GetNotificationsUseCase;

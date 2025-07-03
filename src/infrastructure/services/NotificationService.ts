import INotificationService, {
  NotificationsData,
} from "../../domain/services/INotificationService";
import { NotificationType } from "../libs/prisma/generated/prisma";
import prisma from "../libs/prisma/PrismaClient";

class NotificationService implements INotificationService {
  async create(
    user_id: number,
    message: string,
    type: NotificationType,
    payload?: string
  ): Promise<NotificationsData> {
    return await prisma.notification.create({
      data: {
        message,
        user_id,
        type,
        payload,
      },
    });
  }
  async delete(id: number, user_id: number): Promise<void> {
    await prisma.notification.delete({
      where: {
        id,
        user_id,
      },
    });
  }
  async deleteAll(user_id: number): Promise<void> {
    await prisma.notification.deleteMany({
      where: {
        user_id,
      },
    });
  }
  async getAll(user_id: number): Promise<NotificationsData[] | null> {
    return await prisma.notification.findMany({
      where: {
        user_id,
      },
    });
  }
  async markAllAsRead(user_id: number): Promise<NotificationsData[]> {
    await prisma.notification.updateMany({
      where: {
        user_id,
      },
      data: {
        read: true,
      },
    });
    return (await this.getAll(user_id)) as NotificationsData[];
  }
  async markAsRead(id: number, user_id: number): Promise<NotificationsData> {
    return await prisma.notification.update({
      where: {
        id,
        user_id,
      },
      data: {
        read: true,
      },
    });
  }
}

export default NotificationService;

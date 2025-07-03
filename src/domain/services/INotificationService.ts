import { NotificationType } from "../../infrastructure/libs/prisma/generated/prisma";

export type NotificationsData = {
  id: number;
  user_id: number;
  message: string;
  read: boolean;
  type: NotificationType;
  payload: string | null;
  created_at: Date;
};

interface INotificationService {
  create(
    user_id: number,
    message: string,
    type: NotificationType,
    payload?: string
  ): Promise<NotificationsData>;

  getAll(user_id: number): Promise<NotificationsData[] | null>;

  markAsRead(id: number, user_id: number): Promise<NotificationsData>;

  markAllAsRead(user_id: number): Promise<NotificationsData[]>;

  delete(id: number, user_id: number): Promise<void>;

  deleteAll(user_id: number): Promise<void>;
}

export default INotificationService;

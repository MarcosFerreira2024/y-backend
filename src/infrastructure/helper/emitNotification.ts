import { NotificationsData } from "../../domain/services/INotificationService";
import { getSocketInstance } from "../configs/socket/socketInstance";

async function emitNotification(notification: NotificationsData, to: number) {
  const io = getSocketInstance();

  const sockets = await io.in(`user:${to}`).fetchSockets();

  if (sockets.length > 0) {
    io.to(`user:${to}`).emit("notification", notification);
  }
}

export { emitNotification };

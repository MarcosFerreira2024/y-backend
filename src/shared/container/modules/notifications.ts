
import { container } from "tsyringe";
import DeleteAllNotificationsUseCase from "../../../application/useCases/Notifications/DeleteAllNotificationsUseCase";
import DeleteNotificationUseCase from "../../../application/useCases/Notifications/DeleteNotificationUseCase";
import GetNotificationsUseCase from "../../../application/useCases/Notifications/GetNotificationsUseCase";
import ReadAllNotificationsUseCase from "../../../application/useCases/Notifications/ReadAllNotificationsUseCase";
import ReadNotificationUseCase from "../../../application/useCases/Notifications/ReadNotificationUseCase";

container.registerSingleton(DeleteAllNotificationsUseCase)
container.registerSingleton(DeleteNotificationUseCase)
container.registerSingleton(GetNotificationsUseCase)
container.registerSingleton(ReadAllNotificationsUseCase)
container.registerSingleton(ReadNotificationUseCase)

import { container } from "tsyringe";
import AcceptFriendRequestUseCase from "../../../application/useCases/Friendship/AcceptFriendRequestUseCase";
import GetFriendshipsUseCase from "../../../application/useCases/Friendship/GetFriendshipsUseCase";
import GetFriendRequestsUseCase from "../../../application/useCases/Friendship/GetFriendRequestsUseCase";
import RemoveFriendshipUseCase from "../../../application/useCases/Friendship/RemoveFriendshipUseCase";
import SendFriendRequestUseCase from "../../../application/useCases/Friendship/SendFriendRequestUseCase";
import RejectFriendRequestUseCase from "../../../application/useCases/Friendship/RejectFriendRequestUseCase";

container.registerSingleton(AcceptFriendRequestUseCase);
container.registerSingleton(GetFriendshipsUseCase);
container.registerSingleton(GetFriendRequestsUseCase);
container.registerSingleton(RejectFriendRequestUseCase);
container.registerSingleton(RemoveFriendshipUseCase);
container.registerSingleton(SendFriendRequestUseCase);


import { container } from "tsyringe";
import CreateChatUseCase from "../../../application/useCases/Chat/CreateChatUseCase";
import SendMessageUseCase from "../../../application/useCases/Chat/SendMessageUseCase";

container.registerSingleton(CreateChatUseCase)
container.registerSingleton(SendMessageUseCase)

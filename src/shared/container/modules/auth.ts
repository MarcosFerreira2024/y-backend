import { container } from "tsyringe";
import IJwtProvider from "../../../domain/providers/IJwtProvider";
import JwtProvider from "../../../infrastructure/libs/jwt/JwtProvider";
import LoginUseCase from "../../../application/useCases/Authentication/LoginUseCase";
import ITokenService from "../../../domain/services/ITokenService";
import TokenService from "../../../infrastructure/services/TokenService";

container.registerSingleton<IJwtProvider>("JwtProvider", JwtProvider);
container.registerSingleton(LoginUseCase);
container.registerSingleton<ITokenService>("TokenService", TokenService);

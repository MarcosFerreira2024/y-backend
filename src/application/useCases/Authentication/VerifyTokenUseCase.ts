import { inject, injectable } from "tsyringe";
import ITokenService from "../../../domain/services/ITokenService";

@injectable()
class VerifyTokenUseCase {
  constructor(@inject("TokenService") private tokenService: ITokenService) {}

  async execute(token: string): Promise<string> {
    return await this.tokenService.verifyToken(token);
  }
}

export default VerifyTokenUseCase;

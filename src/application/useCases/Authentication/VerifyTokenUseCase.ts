import { inject, injectable } from "tsyringe";
import ITokenService from "../../../domain/services/ITokenService";

@injectable()
class VerifyTokenUseCase {
  constructor(@inject("TokenService") private tokenService: ITokenService) {}

  async execute(token: string): Promise<{ user_id: number; token: string }> {
    return await this.tokenService.verifyToken(token);
  }
}

export default VerifyTokenUseCase;

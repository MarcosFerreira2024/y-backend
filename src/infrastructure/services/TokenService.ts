import ITokenService from "../../domain/services/ITokenService";
import IJwtProvider from "../../domain/providers/IJwtProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class TokenService implements ITokenService {
  constructor(@inject("JwtProvider") private jwtProvider: IJwtProvider) {}
  async generateToken(user_id: number): Promise<string> {
    return this.jwtProvider.generateToken(user_id);
  }
  async verifyToken(
    token: string
  ): Promise<{ user_id: number; token: string }> {
    return this.jwtProvider.verifyToken(token);
  }
}

export default TokenService;

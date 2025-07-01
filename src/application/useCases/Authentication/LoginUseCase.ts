import { inject, injectable } from "tsyringe";
import IUserRepository from "../../../domain/repositories/IUserRepository";
import IPasswordService from "../../../domain/services/IPasswordService";
import ITokenService from "../../../domain/services/ITokenService";

@injectable()
class LoginUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordService") private passwordService: IPasswordService,
    @inject("TokenService") private tokenService: ITokenService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found, create a new account");

    await this.passwordService.compareAndThrowError(password, user.password);

    const token = this.tokenService.generateToken(user.id);
    return token;
  }
}

export default LoginUseCase;

import IUserRepository, {
  UserData,
} from "../../../domain/repositories/IUserRepository";
import IPasswordHasher from "../../../domain/repositories/IPasswordHasher";
import PasswordService from "../../../infrastructure/services/PasswordService";
import Password from "../../../domain/value-objects/Password";
import IPasswordService from "../../../domain/services/IPasswordService";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserPasswordUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordService") private passwordService: IPasswordService
  ) {}

  async execute(
    id: number,
    password: string
  ): Promise<Omit<UserData, "password">> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");

    await this.passwordService.compareAndThrowError(password, user.password);

    const hashedPassword = (
      await this.passwordService.create(password)
    ).getPassword();

    return await this.userRepository.updatePassword(id, hashedPassword);
  }
}

export default UpdateUserPasswordUseCase;

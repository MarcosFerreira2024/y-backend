import { inject, injectable } from "tsyringe";
import IUserRepository, {
  UserData,
} from "../../../domain/repositories/IUserRepository";
import IPasswordService from "../../../domain/services/IPasswordService";

@injectable()
class UpdateUserEmailUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordService") private passwordService: IPasswordService
  ) {}

  async execute(
    id: number,
    email: string,
    password: string
  ): Promise<Omit<UserData, "password">> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.passwordService.compareAndThrowError(password, user.password);

    return await this.userRepository.updateEmail(id, email);
  }
}

export default UpdateUserEmailUseCase;

import { inject, injectable } from "tsyringe";
import IUserRepository, {
  UserData,
} from "../../../domain/repositories/IUserRepository";
@injectable()
class UpdateUserProfileBgUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(
    id: number,
    profileBg: string,
    password: string
  ): Promise<Omit<UserData, "password">> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await this.userRepository.updateProfileBg(id, profileBg);
  }
}

export default UpdateUserProfileBgUseCase;

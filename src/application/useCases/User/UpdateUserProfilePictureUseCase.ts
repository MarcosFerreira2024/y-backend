import { inject, injectable } from "tsyringe";
import IUserRepository, {
  UserData,
} from "../../../domain/repositories/IUserRepository";

@injectable()
class UpdateUserProfilePictureUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(
    id: number,
    profilePicture: string
  ): Promise<Omit<UserData, "password">> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await this.userRepository.updateProfilePicture(id, profilePicture);
  }
}

export default UpdateUserProfilePictureUseCase;

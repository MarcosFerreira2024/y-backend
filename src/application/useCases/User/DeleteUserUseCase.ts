import { inject, injectable } from "tsyringe";
import IUserRepository from "../../../domain/repositories/IUserRepository";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepository.delete(id);
  }
}

export default DeleteUserUseCase;

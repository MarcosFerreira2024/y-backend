import { inject, injectable } from "tsyringe";
import UserFactory from "../../../domain/entities/factories/UserFactory";

import IPasswordService from "../../../domain/services/IPasswordService";
import IUserRepository from "../../../domain/repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("PasswordService") private passwordService: IPasswordService
  ) {}

  async execute(
    email: string,
    password: string,
    name: string
  ): Promise<{ message: string }> {
    const finded = await this.userRepository.findByEmail(email);
    if (finded) throw new Error("User already exists");
    const hashed = await this.passwordService.create(password);

    const user = await UserFactory({
      name: name,
      email: email,
      password: hashed.getPassword(),
    });

    const toDTO = user.toDTO();
    await this.userRepository.create(toDTO);
    return {
      message: "User created successfully",
    };
  }
}

export default CreateUserUseCase;

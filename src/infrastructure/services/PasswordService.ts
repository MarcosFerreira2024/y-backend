import { inject, injectable } from "tsyringe";
import IPasswordHasher from "../../domain/repositories/IPasswordHasher";
import IPasswordService from "../../domain/services/IPasswordService";
import { validateWithRegex } from "../../domain/shared/regex_validation";
import Password from "../../domain/value-objects/Password";

@injectable()
class PasswordService implements IPasswordService {
  private static readonly regex = /^.{8,}$/;
  private static readonly errorMessage = "Password is Invalid";

  constructor(@inject("PasswordHasher") private hasher: IPasswordHasher) {}

  validatePassword(password: string) {
    return validateWithRegex(
      password,
      PasswordService.regex,
      PasswordService.errorMessage
    );
  }

  async create(password: string): Promise<Password> {
    this.validatePassword(password);

    const hashed = await this.hasher.hashPassword(password);
    return Password.create(hashed);
  }

  async compare(password: string, user_password: string): Promise<boolean> {
    this.validatePassword(password);

    return await this.hasher.comparePassword(password, user_password);
  }

  async compareAndThrowError(
    password: string,
    user_password: string
  ): Promise<boolean> {
    const isValid = await this.compare(password, user_password);
    if (!isValid) throw new Error("Incorrect credentials");

    return isValid;
  }
}

export default PasswordService;

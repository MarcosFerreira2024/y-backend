import IPasswordHasher from "../repositories/IPasswordHasher";
import { validateWithRegex } from "../shared/regex_validation";
import Password from "../value-objects/Password";

class PasswordService {
  private static readonly regex = /^.{8,}$/;
  private static readonly errorMessage = "Password is Invalid";

  constructor(private hasher: IPasswordHasher) {}

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

  async compare(password: string, passwordVO: Password): Promise<Boolean> {
    this.validatePassword(password);

    return await this.hasher.comparePassword(password, passwordVO);
  }
}

export default PasswordService;

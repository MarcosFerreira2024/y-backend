import IPasswordHasher from "../repositories/IPasswordHasher";
import { validateWithRegex } from "../shared/regex_validation";

class Password {
  private static readonly regex = /^.{8,}$/;

  private static readonly errorMessage = "Password is Invalid";

  constructor(
    private hashedPassword: string,
    private hasher: IPasswordHasher
  ) {}

  private static validatePasswordData(password: string): string {
    const validatedPassword = validateWithRegex(
      password,
      Password.regex,
      Password.errorMessage
    );

    return validatedPassword;
  }

  async comparePassword(password: string): Promise<boolean> {
    return await this.hasher.comparePassword(
      Password.validatePasswordData(password),
      this.hashedPassword
    );
  }
}

export default Password;

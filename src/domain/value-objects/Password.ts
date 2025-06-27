import IPasswordHasher from "../repositories/IPasswordHasher";
import { validateWithRegex } from "../shared/regex_validation";

class Password {
  private constructor(private hashedPassword: string) {}
  getPassword(): string {
    return this.hashedPassword;
  }

  static create(hashedPassword: string): Password {
    if (hashedPassword.length != 60 || typeof hashedPassword != "string")
      throw new Error("Invalid hashing");
    return new Password(hashedPassword);
  }
  equals(other: Password): boolean {
    return this.hashedPassword === other.getPassword();
  }
}

export default Password;

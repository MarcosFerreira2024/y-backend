import IPasswordHasher from "../../../domain/repositories/IPasswordHasher";
import bcrypt from "bcrypt";
class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds = 10;
  async comparePassword(
    password: string,
    user_password: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, user_password);
  }
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}

export default BcryptPasswordHasher;

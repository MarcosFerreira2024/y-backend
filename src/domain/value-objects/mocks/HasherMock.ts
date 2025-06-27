import IPasswordHasher from "../../repositories/IPasswordHasher";
import Password from "../Password";

class HasherMock implements IPasswordHasher {
  async comparePassword(
    password: string,
    passwordVO: Password
  ): Promise<boolean> {
    const hashed = await this.hashPassword(password);
    return hashed === passwordVO.getPassword();
  }

  async hashPassword(password: string): Promise<string> {
    const base = Buffer.from(password).toString("base64");
    const paddedHash = (base + "x".repeat(60)).substring(0, 60);
    return paddedHash;
  }
}

export default HasherMock;

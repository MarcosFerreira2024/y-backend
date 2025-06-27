import Password from "../value-objects/Password";

interface IPasswordHasher {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: Password): Promise<boolean>;
}

export default IPasswordHasher;

import Password from "../value-objects/Password";

interface IPasswordHasher {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, user_password: string): Promise<boolean>;
}

export default IPasswordHasher;

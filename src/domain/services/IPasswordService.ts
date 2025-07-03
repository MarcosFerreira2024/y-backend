import Password from "../value-objects/Password";

interface IPasswordService {
  validatePassword(password: string): string;
  create(password: string): Promise<Password>;
  compare(password: string, user_password: string): Promise<boolean>;
  compareAndThrowError(
    password: string,
    user_password: string
  ): Promise<boolean>;
}

export default IPasswordService;

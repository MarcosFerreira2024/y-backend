import IPasswordHasher from "../../repositories/IPasswordHasher";

class HasherMock implements IPasswordHasher {
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const hashed = await this.hashPassword(password);

    if (hashed === hashedPassword) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
  async hashPassword(password: string): Promise<string> {
    const template = `${password}-hashed`;
    return Promise.resolve(template);
  }
}
export default HasherMock;

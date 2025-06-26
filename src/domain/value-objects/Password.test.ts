import HasherMock from "./mocks/HasherMock";
import Password from "./Password";

describe("Password value object", () => {
  const hasher = new HasherMock();

  let hashedPassword: string;
  let password = "12345678";

  beforeAll(async () => {
    hashedPassword = await hasher.hashPassword(password);
  });

  it("Should create a Password VO", async () => {
    const passwordVO = new Password(hashedPassword, hasher);

    expect(passwordVO).toBeInstanceOf(Password);
  });

  it("should compare the password", async () => {
    const passwordVO = new Password(hashedPassword, hasher);
    const result = await passwordVO.comparePassword(password);
    expect(result).toBe(true);
  });
});

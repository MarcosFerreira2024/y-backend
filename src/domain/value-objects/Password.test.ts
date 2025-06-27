import PasswordService from "../services/PasswordService";
import HasherMock from "./mocks/HasherMock";
import Password from "./Password";

describe("Password value object", () => {
  let passwordService: PasswordService;

  beforeAll(async () => {
    passwordService = new PasswordService(new HasherMock());
  });

  it("Should create a Password VO", async () => {
    const passwordVO = await passwordService.create("12341234");
    expect(passwordVO).toBeInstanceOf(Password);
  });

  it("should compare the password and return a boolean", async () => {
    const password = "12341234";
    const correctPassword = "12341234"; // correct value
    const incorrectPassword = "12341222"; // incorrect value
    const passwordVO = await passwordService.create(password);

    const correct = await passwordService.compare(correctPassword, passwordVO);
    const incorrect = await passwordService.compare(
      incorrectPassword,
      passwordVO
    );

    expect(correct).toBe(true);
    expect(incorrect).toBe(false);
  });
});

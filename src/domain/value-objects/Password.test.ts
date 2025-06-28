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

  it("should compare the password and return a boolean if the password is correct", async () => {
    const correctPassword = "12341234";
    const passwordVO = await passwordService.create("12341234");
    const correct = await passwordService.compare(correctPassword, passwordVO);
    expect(correct).toBe(true);
  });

  it("should throw an error if the password is incorrect", async () => {
    const incorrectPassword = "12345632423424";
    const passwordVO = await passwordService.create("12341234");
    await expect(
      passwordService.compare(incorrectPassword, passwordVO)
    ).rejects.toThrow(/Password is incorrect/i);
  });

  it("should throw an error for a password that is too short", async () => {
    await expect(passwordService.create("123")).rejects.toThrow(
      /Password is Invalid/i
    );
  });
});

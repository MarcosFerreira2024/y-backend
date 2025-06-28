import PasswordService from "../services/PasswordService";
import Email from "../value-objects/Email";
import HasherMock from "../value-objects/mocks/HasherMock";
import Name from "../value-objects/Name";
import Password from "../value-objects/Password";
import UserFactory from "./factories/UserFactory";
import User from "./User";

describe("User entity", () => {
  let user: User;

  beforeEach(async () => {
    user = await UserFactory(
      {
        created_at: new Date(),
        email: "John@doe.com",
        id: 1,
        name: "John Doe",
        slug: "@john-doe",
        password: "12341234",
        profile_bg: null,
        profile_picture: null,
        updated_at: new Date(),
      },
      new HasherMock()
    );
  });

  it("updates the name when changeName is called", () => {
    user.changeName(Name.create("John Doe Da Silva"));
    expect(user.toDTO().name).toBe("John Doe Da Silva");
  });

  it("updates the email when changeEmail is called", () => {
    const newEmail = "john.silva@example.com";
    user.changeEmail(Email.create(newEmail));
    expect(user.toDTO().email).toBe(newEmail);
  });

  it("updates the profile picture when changeProfilePicture is called", () => {
    user.changeProfilePicture("https://example.com/image.jpg");
    expect(user.toDTO().profile_picture).toBe("https://example.com/image.jpg");
  });

  it("updates the profile background when changeProfileBg is called", () => {
    user.changeProfileBg("https://example.com/image.jpg");
    expect(user.toDTO().profile_bg).toBe("https://example.com/image.jpg");
  });

  it("updates the password when changePassword is called", async () => {
    const passwordService = new PasswordService(new HasherMock());
    const comparePassword = await passwordService.compare(
      "12341234",
      user.toVO().password
    );
    if (!comparePassword) throw new Error("Password is incorrect");
    const newPassword = await passwordService.create("12345678");
    const password = user.changePassword(newPassword);

    expect(password).toBeInstanceOf(Password);
  });
});

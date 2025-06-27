import PasswordService from "../services/PasswordService";
import Email from "../value-objects/Email";
import Name from "../value-objects/Name";
import Password from "../value-objects/Password";
import UserId from "../value-objects/UserId";

class User {
  constructor(
    private id: UserId,
    private name: Name,
    private email: Email,
    private password: Password,
    private profile_picture: string | null,
    private profile_bg: string | null,
    private created_at: Date,
    private updated_at: Date
  ) {}

  toDTO() {
    return {
      id: this.id.getId(),
      name: this.name.getName(),
      password: this.password.getPassword(),
      email: this.email.getEmail(),
      profile_picture: this.profile_picture,
      profile_bg: this.profile_bg,
      created_at: this.created_at.toLocaleString("pt-BR"),
      updated_at: this.updated_at.toLocaleString("pt-BR"),
    };
  }
  changeName(newName: Name) {
    if (!(newName instanceof Name)) throw new Error("Invalid Name");
    if (this.name.equals(newName))
      throw new Error("Name is the same as the old one");
    this.name = newName;
  }
  changeEmail(newEmail: Email) {
    if (!(newEmail instanceof Email)) throw new Error("Invalid Email");
    if (this.email.equals(newEmail))
      throw new Error("Email is the same as the old one");
    this.email = newEmail;
  }
  changeProfilePicture(newProfilePicture: string | null) {
    if (this.profile_picture === newProfilePicture)
      throw new Error("Profile picture is the same as the old one");
    this.profile_picture = newProfilePicture;
  }
  changeProfileBg(newProfileBg: string | null) {
    if (this.profile_bg === newProfileBg)
      throw new Error("Profile background is the same as the old one");
    this.profile_bg = newProfileBg;
  }
  async changePassword(
    newPassword: Password,
    PasswordService: PasswordService
  ) {
    if (!(newPassword instanceof Password)) throw new Error("Invalid Password");

    if (await PasswordService.compare(this.password.getPassword(), newPassword))
      throw new Error("Password is the same as the old one");
    this.password = newPassword;
  }
}

export default User;

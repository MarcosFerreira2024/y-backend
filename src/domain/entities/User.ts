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
      email: this.email.getEmail(),
      profile_picture: this.profile_picture,
      profile_bg: this.profile_bg,
      created_at: this.created_at.toLocaleString("pt-BR"),
      updated_at: this.updated_at.toLocaleString("pt-BR"),
    };
  }
  changeName(newName: Name) {
    this.name = newName;
  }
  changeEmail(newEmail: Email) {
    this.email = newEmail;
  }
  changeProfilePicture(newProfilePicture: string | null) {
    this.profile_picture = newProfilePicture;
  }
  changeProfileBg(newProfileBg: string | null) {
    this.profile_bg = newProfileBg;
  }
  changePassword(newPassword: Password) {
    this.password = newPassword;
  }
}

export default User;

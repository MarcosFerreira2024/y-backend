import IPasswordHasher from "../../repositories/IPasswordHasher";
import PasswordService from "../../services/PasswordService";
import Email from "../../value-objects/Email";
import Name from "../../value-objects/Name";
import Id from "../../value-objects/UserId";
import User from "../User";

type UserData = {
  id: string;
  name: string;
  email: string;
  password: string;
  profile_picture: string | null;
  profile_bg: string | null;
  created_at: Date;
  updated_at: Date;
};

async function UserFactory(data: UserData, hasher: IPasswordHasher) {
  const passwordService = new PasswordService(hasher);
  const password = await passwordService.create(data.password);
  return new User(
    Id.create(data.id),
    Name.create(data.name),
    Email.create(data.email),
    password,
    data.profile_picture,
    data.profile_bg,
    data.created_at,
    data.updated_at
  );
}

export default UserFactory;

export type { UserData };

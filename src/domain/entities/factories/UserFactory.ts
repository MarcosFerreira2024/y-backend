import IPasswordHasher from "../../repositories/IPasswordHasher";
import PasswordService from "../../../infrastructure/services/PasswordService";
import Email from "../../value-objects/Email";
import Name from "../../value-objects/Name";
import Slug from "../../value-objects/Slug";
import User from "../User";
import Password from "../../value-objects/Password";

type FactoryData = {
  name: string;
  email: string;
  password: string;
  profile_picture?: string | null;
  profile_bg?: string | null;
};

async function UserFactory(data: FactoryData) {
  const user = new User(
    1,
    Name.create(data.name),
    Slug.create(Name.create(data.name)),
    Email.create(data.email),
    Password.create(data.password),
    new Date(),
    new Date(),
    data.profile_picture,
    data.profile_bg
  );
  console.log(user);
  return user;
}

export default UserFactory;

export type { FactoryData };

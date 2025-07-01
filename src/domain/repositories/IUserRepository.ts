import User from "../entities/User";

export type UserCreationInputs = {
  email: string;
  name: string;
  password: string;
  slug: string;
};

export type UserData = {
  slug: string;
  name: string;
  id: number;
  email: string;
  password: string;
  profile_picture: string | null;
  profile_bg: string | null;
  created_at: Date;
  updated_at: Date;
} | null;

interface IUserRepository {
  create(data: UserCreationInputs): Promise<void>;
  findByEmail(email: string): Promise<UserData | null>;
  findById(id: number): Promise<UserData | null>;
  findBySlug(slug: string): Promise<UserData | null>;
  updateProfilePicture(
    id: number,
    profile_picture: string
  ): Promise<Omit<UserData, "password">>;
  updateProfileBg(
    id: number,
    profile_bg: string
  ): Promise<Omit<UserData, "password">>;
  updateEmail(id: number, email: string): Promise<Omit<UserData, "password">>;
  updateName(id: number, name: string): Promise<Omit<UserData, "password">>;
  updatePassword(
    id: number,
    newPassword: string
  ): Promise<Omit<UserData, "password">>;
  delete(id: number): Promise<void>;
}

export default IUserRepository;

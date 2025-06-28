import { UserDataDTO } from "../entities/factories/UserFactory";
import User from "../entities/User";

interface IUserRepository {
  create(user: UserDataDTO): Promise<void>;
  findByEmail(email: string): Promise<UserDataDTO | null>;
  findById(id: number): Promise<UserDataDTO | null>;
  findBySlug(slug: string): Promise<UserDataDTO | null>;
  updateProfilePicture(
    id: number,
    profile_picture: string
  ): Promise<Omit<UserDataDTO, "password">>;
  updateProfileBg(
    id: number,
    profile_bg: string
  ): Promise<Omit<UserDataDTO, "password">>;
  updateEmail(
    id: number,
    email: string
  ): Promise<Omit<UserDataDTO, "password">>;
  updatePassword(
    id: number,
    newPassword: string
  ): Promise<Omit<UserDataDTO, "password">>;
  delete(id: number): Promise<void>;
}

export default IUserRepository;

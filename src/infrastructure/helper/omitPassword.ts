import { UserDataDTO } from "../../domain/entities/factories/UserFactory";

export function omitPassword(user: UserDataDTO): Omit<UserDataDTO, "password"> {
  const { password, ...safe } = user;
  return safe;
}

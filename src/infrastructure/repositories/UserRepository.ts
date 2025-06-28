import UserFactory, {
  UserDataDTO,
} from "../../domain/entities/factories/UserFactory";
import User from "../../domain/entities/User";
import IUserRepository from "../../domain/repositories/IUserRepository";
import Name from "../../domain/value-objects/Name";
import Slug from "../../domain/value-objects/Slug";
import { omitPassword } from "../helper/omitPassword";
import prisma from "../libs/prisma/PrismaClient";

class UserRepository implements IUserRepository {
  private async tryCreateUserWithSlug(
    user: UserDataDTO,
    slug: string
  ): Promise<void> {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        slug,
      },
    });
  }

  async create(user: UserDataDTO): Promise<void> {
    const maxAttempts = 20;
    const name = Name.create(user.name);
    for (let i = 0; i <= maxAttempts; i++) {
      try {
        const slug = Slug.create(name).getValue();
        await this.tryCreateUserWithSlug(user, slug);
        return;
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes(
            "Unique constraint failed on the fields: (`slug`)"
          )
        )
          continue;
        throw error;
      }
    }

    const slug = Slug.create(name, true).getValue();
    await this.tryCreateUserWithSlug(user, slug);
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserDataDTO | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findById(id: number): Promise<UserDataDTO | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findBySlug(slug: string): Promise<UserDataDTO | null> {
    return await prisma.user.findUnique({
      where: {
        slug,
      },
    });
  }

  async updatePassword(
    id: number,
    newPassword: string
  ): Promise<Omit<UserDataDTO, "password">> {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });
    return omitPassword(updated);
  }
  async updateEmail(
    id: number,
    email: string
  ): Promise<Omit<UserDataDTO, "password">> {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });
    return omitPassword(updated);
  }
  async updateProfileBg(
    id: number,
    profile_bg: string
  ): Promise<Omit<UserDataDTO, "password">> {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        profile_bg,
      },
    });
    return omitPassword(updated);
  }
  async updateProfilePicture(
    id: number,
    profile_picture: string
  ): Promise<Omit<UserDataDTO, "password">> {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        profile_picture,
      },
    });
    return omitPassword(updated);
  }
}

export default UserRepository;

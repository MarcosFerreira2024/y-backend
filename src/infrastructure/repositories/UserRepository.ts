import IUserRepository, {
  UserCreationInputs,
  UserData,
} from "../../domain/repositories/IUserRepository";
import Name from "../../domain/value-objects/Name";
import Slug from "../../domain/value-objects/Slug";
import { omitPassword } from "../helper/omitPassword";
import prisma from "../libs/prisma/PrismaClient";

class UserRepository implements IUserRepository {
  private async tryCreateUserWithSlug(
    user: UserCreationInputs,
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
  async updateName(
    id: number,
    name: string
  ): Promise<Omit<UserData, "password">> {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return omitPassword(updated);
  }

  async create(user: UserCreationInputs): Promise<void> {
    let attempts = 0;
    const maxAttempts = 5;
    let currentSlug = user.slug;

    while (attempts < maxAttempts) {
      try {
        await this.tryCreateUserWithSlug(user, currentSlug);
        return;
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("Unique constraint failed")
        ) {
          attempts++;
          const name = Name.create(user.name);
          const newSlug = Slug.create(name, true);
          currentSlug = newSlug.getValue();
        } else {
          throw error;
        }
      }
    }

    throw new Error("Falha ao criar usuário após múltiplas tentativas de slug");
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<UserData | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findById(id: number): Promise<UserData | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findBySlug(slug: string): Promise<UserData | null> {
    return await prisma.user.findUnique({
      where: {
        slug,
      },
    });
  }

  async updatePassword(
    id: number,
    newPassword: string
  ): Promise<Omit<UserData, "password">> {
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
  ): Promise<Omit<UserData, "password">> {
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
  ): Promise<Omit<UserData, "password">> {
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
  ): Promise<Omit<UserData, "password">> {
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

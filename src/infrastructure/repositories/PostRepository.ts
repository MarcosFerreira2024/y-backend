import IPostRepository, {
  PostCreationInputs,
  PostData,
} from "../../domain/repositories/IPostRepository";
import prisma from "../libs/prisma/PrismaClient";

class PostRepository implements IPostRepository {
  async create(post: PostCreationInputs): Promise<void> {
    await prisma.post.create({
      data: {
        content: post.content,
        author: {
          connect: {
            id: post.user_id,
          },
        },
        image: post.image,
      },
    });
  }
  async findById(id: number): Promise<PostData | null> {
    return await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  }
  async findByContent(content: string): Promise<PostData[] | null> {
    return await prisma.post.findMany({
      where: {
        content: {
          contains: content,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }
  async findByUserSlug(slug: string): Promise<PostData[] | null> {
    return await prisma.post.findMany({
      where: {
        author: {
          slug,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }
  async addLike(post_id: number, user_id: number): Promise<void> {
    await prisma.$transaction([
      prisma.post.update({
        where: {
          id: post_id,
        },
        data: {
          likes_count: {
            increment: 1,
          },
        },
      }),
      prisma.post_like.create({
        data: {
          user_id,
          post_id,
        },
      }),
    ]);
  }
  async getLikes(post_id: number): Promise<number> {
    const result = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      select: {
        likes_count: true,
      },
    });
    return result!.likes_count;
  }
  async removeLike(post_id: number, user_id: number): Promise<void> {
    await prisma.$transaction([
      prisma.post.update({
        where: {
          id: post_id,
        },
        data: {
          likes_count: {
            decrement: 1,
          },
        },
      }),
      prisma.post_like.delete({
        where: {
          post_id_user_id: {
            post_id,
            user_id,
          },
        },
      }),
    ]);
  }
}

export default PostRepository;

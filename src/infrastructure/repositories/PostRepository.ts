import Post, { PostDataDTO } from "../../domain/entities/Post";
import IPostRepository from "../../domain/repositories/IPostRepository";
import prisma from "../libs/prisma/PrismaClient";

class PostRepository implements IPostRepository {
  async create(post: PostDataDTO): Promise<void> {
    await prisma.post.create({
      data: post,
    });
  }
  async delete(id: number): Promise<void> {
    await prisma.post.delete({
      where: {
        id,
      },
    });
  }
  async findByContent(content: string): Promise<PostDataDTO[] | null> {
    return await prisma.post.findMany({
      where: {
        content,
      },
    });
  }
  async findByUserSlug(slug: string): Promise<PostDataDTO[] | null> {
    return await prisma.post.findMany({
      where: {
        author: {
          slug,
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

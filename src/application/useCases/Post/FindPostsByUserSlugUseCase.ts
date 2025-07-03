import { inject, injectable } from "tsyringe";
import IPostRepository, {
  PostData,
} from "../../../domain/repositories/IPostRepository";

@injectable()
class FindPostsByUserSlugUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(user_slug: string): Promise<PostData[]> {
    const posts = await this.postRepository.findByUserSlug(user_slug);
    if (!posts) {
      throw new Error("Posts not found");
    }
    return posts;
  }
}

export { FindPostsByUserSlugUseCase };

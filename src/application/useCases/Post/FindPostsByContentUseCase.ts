import { inject, injectable } from "tsyringe";
import IPostRepository, {
  PostData,
} from "../../../domain/repositories/IPostRepository";

@injectable()
class FindPostsByContentUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(content: string): Promise<PostData[]> {
    const posts = await this.postRepository.findByContent(content);
    if (!posts) {
      throw new Error("Posts not found");
    }
    return posts;
  }
}

export { FindPostsByContentUseCase };

import { inject, injectable } from "tsyringe";
import IPostRepository, {
  PostData,
} from "../../../domain/repositories/IPostRepository";

@injectable()
class FindPostByIdUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(id: number): Promise<PostData> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }
}

export { FindPostByIdUseCase };

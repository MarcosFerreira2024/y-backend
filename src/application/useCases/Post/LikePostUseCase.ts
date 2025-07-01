import { inject, injectable } from "tsyringe";
import IPostRepository from "../../../domain/repositories/IPostRepository";

@injectable()
class LikePostUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(
    post_id: number,
    user_id: number
  ): Promise<{ message: string }> {
    const post = await this.postRepository.findById(post_id);
    if (!post) {
      throw new Error("Post not found");
    }
    await this.postRepository.addLike(post_id, user_id);

    return {
      message: "Post liked successfully",
    };
  }
}

export default LikePostUseCase;

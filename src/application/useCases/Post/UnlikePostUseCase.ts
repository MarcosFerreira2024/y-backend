import { inject, injectable } from "tsyringe";
import IPostRepository from "../../../domain/repositories/IPostRepository";

@injectable()
class UnlikePostUseCase {
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
    await this.postRepository.removeLike(post_id, user_id);

    return {
      message: "Post unliked successfully",
    };
  }
}

export default UnlikePostUseCase;

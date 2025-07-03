import { inject, injectable } from "tsyringe";
import IPostRepository from "../../../domain/repositories/IPostRepository";

@injectable()
class UnlikePostUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(post_id: number, user_id: number): Promise<void> {
    const post = await this.postRepository.findById(post_id);
    if (!post) {
      throw new Error("Post not found or the post was deleted");
    }
    await this.postRepository.removeLike(post_id, user_id);
  }
}

export default UnlikePostUseCase;

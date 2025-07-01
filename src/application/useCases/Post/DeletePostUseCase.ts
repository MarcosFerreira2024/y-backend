import { inject, injectable } from "tsyringe";
import IPostRepository from "../../../domain/repositories/IPostRepository";

@injectable()
class DeletePostUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(id: number): Promise<{ message: string }> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    await this.postRepository.delete(id);

    return {
      message: "Post deleted successfully",
    };
  }
}

export default DeletePostUseCase;

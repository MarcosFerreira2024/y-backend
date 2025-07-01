import { inject, injectable } from "tsyringe";
import PostFactory from "../../../domain/entities/factories/PostFactory";
import IPostRepository from "../../../domain/repositories/IPostRepository";

@injectable()
class CreatePostUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(content: string, image?: string): Promise<{ message: string }> {
    const post = PostFactory({ content, image });
    const toDTO = post.toDTO();
    await this.postRepository.create(toDTO);
    return {
      message: "Post created successfully",
    };
  }
}

export default CreatePostUseCase;

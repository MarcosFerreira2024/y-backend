import { inject, injectable } from "tsyringe";
import PostFactory from "../../../domain/entities/factories/PostFactory";
import IPostRepository from "../../../domain/repositories/IPostRepository";
import INotificationService from "../../../domain/services/INotificationService";

@injectable()
class CreatePostUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(
    user_id: number,
    content: string,
    image?: string
  ): Promise<void> {
    const post = PostFactory({ user_id, content, image });

    await this.postRepository.create(post.toDTO());
  }
}

export default CreatePostUseCase;

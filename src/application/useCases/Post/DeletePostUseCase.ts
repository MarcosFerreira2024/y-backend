import { inject, injectable } from "tsyringe";
import IPostRepository from "../../../domain/repositories/IPostRepository";
import INotificationService from "../../../domain/services/INotificationService";
import Name from "../../../domain/value-objects/Name";

@injectable()
class DeletePostUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository
  ) {}

  async execute(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    await this.postRepository.delete(id);
  }
}

export default DeletePostUseCase;

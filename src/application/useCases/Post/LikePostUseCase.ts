import { inject, injectable } from "tsyringe";
import IPostRepository from "../../../domain/repositories/IPostRepository";
import INotificationService from "../../../domain/services/INotificationService";
import { getSocketInstance } from "../../../infrastructure/configs/socket/socketInstance";
import { emitNotification } from "../../../infrastructure/helper/emitNotification";

@injectable()
class LikePostUseCase {
  constructor(
    @inject("PostRepository") private postRepository: IPostRepository,
    @inject("NotificationService")
    private notificationService: INotificationService
  ) {}

  async execute(post_id: number, user_id: number): Promise<void> {
    const post = await this.postRepository.findById(post_id);
    if (!post) {
      throw new Error("Post not found or the post was deleted");
    }
    await this.postRepository.addLike(post_id, user_id);

    const notification = await this.notificationService.create(
      post.author.id,
      `Someone liked your post`,
      "POST_LIKED"
    );

    await emitNotification(notification, post.author.id);
  }
}

export default LikePostUseCase;

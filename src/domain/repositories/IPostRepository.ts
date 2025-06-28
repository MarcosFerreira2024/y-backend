import Post, { PostDataDTO } from "../entities/Post";

interface IPostRepository {
  create(post: PostDataDTO): Promise<void>;
  delete(id: number): Promise<void>;
  addLike(post_id: number, user_id: number): Promise<void>;
  removeLike(post_id: number, user_id: number): Promise<void>;
  getLikes(post_id: number): Promise<number>;
  findByContent(content: string): Promise<PostDataDTO[] | null>;
  findByUserSlug(slug: string): Promise<PostDataDTO[] | null>;
}

export default IPostRepository;

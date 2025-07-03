export type PostData = {
  id: number;
  image: string | null;
  content: string;
  likes_count: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  author: {
    id: number;
    name: string;
    slug: string;
  };
};

export type PostCreationInputs = {
  user_id: number;
  content: string;
  image?: string | null;
};

interface IPostRepository {
  create(post: PostCreationInputs): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<PostData | null>;
  addLike(post_id: number, user_id: number): Promise<void>;
  removeLike(post_id: number, user_id: number): Promise<void>;
  getLikes(post_id: number): Promise<number>;
  findByContent(content: string): Promise<PostData[] | null>;
  findByUserSlug(slug: string): Promise<PostData[] | null>;
}

export default IPostRepository;

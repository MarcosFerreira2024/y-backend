import Content from "../value-objects/Content";

type PostDataDTO = {
  id: number;
  image?: string | null;
  content: string;
  likes_count?: number | null;
  created_at: Date;
  updated_at: Date;
  user_id: number;
};

type PostVO = {
  id: number | null;
  user_id: number;
  content: Content;
  image: string | null;
  created_at: Date;
  updated_at: Date;
};

class Post {
  constructor(
    private id: number | null,
    private user_id: number,
    private content: Content,
    private created_at: Date,
    private updated_at: Date,
    private image?: string | null,
    private likes_count?: number
  ) {}

  toDTO() {
    return {
      id: this.id,
      user_id: this.user_id,
      content: this.content.getContent(),
      image: this.image,
      likes_count: this.likes_count,
      created_at: this.created_at.toLocaleString("pt-BR"),
      updated_at: this.updated_at.toLocaleString("pt-BR"),
    };
  }
  toVO() {
    return {
      id: this.id,
      user_id: this.user_id,
      content: this.content,
      image: this.image,
      likes_count: this.likes_count,

      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default Post;

export type { PostDataDTO, PostVO };

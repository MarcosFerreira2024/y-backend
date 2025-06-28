import Content from "../value-objects/Content";
import PostFactory, { PostDataDTO } from "./factories/PostFactory";
import Post from "./Post";

describe("Post entity", () => {
  let data: PostDataDTO;
  let post: Post;
  beforeEach(() => {
    data = {
      id: 1,
      user_id: 1,
      content: "content",
      created_at: new Date(),
      image: null,
      updated_at: new Date(),
      likes_count: 0,
    };
    post = PostFactory(data);
  });

  it("should be able to create a post", () => {
    expect(post).toBeInstanceOf(Post);
  });

  it("should be able to get post data", () => {
    console.log(post.toDTO);
    console.log(data);
    console.log(post.toDTO());
    expect(post.toDTO()).toEqual({
      ...data,
      created_at: data.created_at.toLocaleString("pt-BR"),
      updated_at: data.updated_at.toLocaleString("pt-BR"),
    });
  });
});

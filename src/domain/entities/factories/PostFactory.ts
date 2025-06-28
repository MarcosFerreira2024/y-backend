import Content from "../../value-objects/Content";
import Id from "../../value-objects/Id";
import Post, { PostDataDTO } from "../Post";

function PostFactory(data: PostDataDTO) {
  return new Post(
    Id.create(data.id),
    Id.create(data.user_id),
    Content.create(data.content),
    data.image,
    data.created_at,
    data.updated_at,
    data.likes_count
  );
}

export default PostFactory;

export type { PostDataDTO };

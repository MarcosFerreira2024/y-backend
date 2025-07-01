import Content from "../../value-objects/Content";
import Post, { PostDataDTO } from "../Post";

type FactoryData = {
  content: string;
  image?: string;
};

function PostFactory(data: FactoryData) {
  return new Post(
    1,
    1,
    Content.create(data.content),
    new Date(),
    new Date(),
    data.image,
    0
  );
}

export default PostFactory;

export type { PostDataDTO };

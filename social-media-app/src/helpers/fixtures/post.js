import { v4 as uuid4 } from "uuid";
import userFixtures from "./user";
function postFixtures(isLiked = true, isEdited = false, user = undefined) {
  return {
    id: uuid4(),
    author: user || userFixtures(),
    body: "kqlmkfmldksfkqsmdklfkqsdf",
    edited: isEdited,
    liked: isLiked,
    likes_count: Math.floor(Math.random() * 10),
    comments_count: Math.floor(Math.random() * 10),
    created: new Date(),
    updated: new Date(),
  };
}
export default postFixtures;

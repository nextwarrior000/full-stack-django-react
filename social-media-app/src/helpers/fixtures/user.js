import { v4 as uuid4 } from "uuid";
function userFixtures() {
  const firstName = "bilel";
  const lastName = "salem";
  return {
    id: uuid4(),
    first_name: firstName,
    last_name: lastName,
    name: firstName + " " + lastName,
    post_count: Math.floor(Math.random() * 10),
    email: `${firstName}@yopmail.com`,
    bio: " fqsdfqsdfqsdfqsdfjqkljdfkl",
    username: firstName + lastName,
    password: "qfds4f5q6sd4f56qsd@qfsdkfjqoksdjf",
    avatar: null,
    created: new Date(),
    updated: new Date(),
  };
}
export default userFixtures;

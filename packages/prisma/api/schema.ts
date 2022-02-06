import { User } from "nexus-prisma";
import { makeSchema, objectType } from "nexus";

const Mutation = objectType({
  name: "Mutation",
  definition(t: any) {
    t.field("test", {
      type: "User",
      resolve: () => {
        return {
          id: "123",
        };
      },
    });
  },
});

const UserType = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.id);
  },
});

export const schema = makeSchema({
  types: [Mutation, UserType],
});

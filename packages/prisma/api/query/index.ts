import { objectType } from "nexus";

const Query = objectType({
  name: "Query",
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

export default Query;

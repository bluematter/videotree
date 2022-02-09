import { objectType } from "nexus";
import user from "./user";

const Query = objectType({
  name: "Query",
  definition(t: any) {
    user(t);
  },
});

export default Query;

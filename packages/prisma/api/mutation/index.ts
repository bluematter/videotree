import { objectType } from "nexus";
import auth from "./auth";
import media from "./media";

const Mutation = objectType({
  name: "Mutation",
  definition(t: any) {
    auth(t);
    media(t);
  },
});

export default Mutation;

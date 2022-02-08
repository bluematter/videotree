import { objectType } from "nexus";
import auth from "./auth";

const Mutation = objectType({
  name: "Mutation",
  definition(t: any) {
    auth(t);
  },
});

export default Mutation;

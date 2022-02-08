import { makeSchema } from "nexus";
import { UserType } from "./models/User";
import Mutation from "./mutation";
import { AuthenticateUserPayload } from "./mutation/auth";
import Query from "./query";

export const schema = makeSchema({
  types: [Query, Mutation, UserType, AuthenticateUserPayload],
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});

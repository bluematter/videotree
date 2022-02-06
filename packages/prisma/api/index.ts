import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { createContext } from "./context";

const server = new ApolloServer({
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  },
  schema: schema,
  context: createContext,
});

server.listen({ port: 3001 }).then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `);
});

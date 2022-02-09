import { getUser } from "../helpers";

export default (t: any) => {
  t.field("user", {
    type: "User",
    resolve: async (_: any, args: any, ctx: any) => {
      const userID = getUser(ctx.req.req.headers);

      if (userID) {
        try {
          const user = await ctx.prisma.user.findUnique({
            where: { id: userID },
          });

          return user;
        } catch (e) {
          console.log({
            e,
          });

          throw new Error(JSON.stringify(e));
        }
      }

      throw new Error("Not Authenticated");
    },
  });
};

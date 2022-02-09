import { objectType, stringArg } from "nexus";
import jwt from "jsonwebtoken";
import validator from "validator";
import * as bcrypt from "bcryptjs";
import { getGoogleUser } from "../helpers";

export const SECRET = "VIDEOTREE_SECRET";

export const AuthenticateUserPayload = objectType({
  name: "AuthenticateUserPayload",
  definition: (t) => {
    t.string("id", { description: "The logged in users ID" });
    t.string("email", {
      description:
        "The users email stored in the DB from Google or manually inputted",
    });
    t.string("token", { description: "The token for the authenticated user" });
    t.string("createdat", {
      description: "The timestamp when the user was created",
    });
  },
});

export default (t: any) => {
  // authenticate google user
  t.field("authenticateGoogleUser", {
    type: "AuthenticateUserPayload",
    args: {
      googleToken: stringArg(),
    },
    resolve: async (_: any, { googleToken }: any, ctx: any) => {
      try {
        // call google API to obtain user data
        const googleUser: any = await getGoogleUser(googleToken);

        // get db user by google id
        const user = await ctx.prisma.user.findUnique({
          where: {
            googleuserid: googleUser.sub,
          },
        });

        // update email if does not match google
        if (user && googleUser.email !== user.email) {
          await ctx.prisma.user.update({
            where: { id: user.id },
            data: {
              email: googleUser.email,
            },
          });
        }

        if (user) {
          return {
            id: user.id,
            email: googleUser.email,
            token: jwt.sign({ userId: user.id }, SECRET, {
              expiresIn: "30d",
            }),
            createdat: user.createdat,
          };
        }

        const createdUser = await ctx.prisma.user.create({
          data: {
            googleuserid: googleUser.sub,
            name: googleUser.name,
            email: googleUser.email,
            picture: googleUser.picture,
          },
        });

        return {
          id: createdUser.id,
          email: createdUser.email,
          token: jwt.sign({ userId: createdUser.id }, SECRET, {
            expiresIn: "30d",
          }),
          createdat: createdUser.createdat,
        };
      } catch (e) {
        throw new Error(JSON.stringify(e, Object.getOwnPropertyNames(e)));
      }
    },
  });
};

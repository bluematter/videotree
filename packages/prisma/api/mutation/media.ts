import { idArg, stringArg, booleanArg, floatArg } from "nexus";

export default (t: any) => {
  // Create
  t.field("createMedia", {
    type: "Media",
    args: {
      duration: floatArg(),
      loading: booleanArg(),
      mediaurl: stringArg(),
      name: stringArg(),
      ownerId: idArg(),
      type: stringArg(),
    },
    resolve: (
      _: any,
      { duration, loading, mediaurl, name, ownerId, type }: any,
      { prisma }: any
    ) => {
      try {
        return prisma.media.create({
          data: {
            duration,
            loading,
            mediaurl,
            name,
            type,
            user: {
              connect: {
                id: ownerId,
              },
            },
          },
        });
      } catch (e: any) {
        throw new Error(e);
      }
    },
  });

  // Update
  t.field("updateMedia", {
    type: "Media",
    args: {
      id: idArg(),
      type: stringArg(),
      name: stringArg(),
      loading: booleanArg(),
      mediaurl: stringArg(),
      duration: floatArg(),
    },
    resolve: async (
      _: any,
      { id, type, name, loading, mediaurl, duration }: any,
      { prisma }: any
    ) => {
      try {
        return prisma.media.update({
          where: { id },
          data: {
            type,
            name,
            loading,
            mediaurl,
            duration,
          },
        });
      } catch (e: any) {
        throw new Error(e);
      }
    },
  });
};

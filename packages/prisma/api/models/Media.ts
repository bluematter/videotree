import { Media } from "nexus-prisma";
import { objectType } from "nexus";

export const MediaType = objectType({
  name: Media.$name,
  definition(t) {
    t.field(Media.id);
    t.field(Media.type);
    t.field(Media.duration);
    t.field(Media.mediaurl);
    t.field(Media.name);
  },
});

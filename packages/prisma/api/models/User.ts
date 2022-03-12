import { User } from "nexus-prisma";
import { objectType } from "nexus";

export const UserType = objectType({
  name: User.$name,
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.picture);

    t.field({
      ...User.media,
      async resolve(...args) {
        // Your custom before-logic here
        const result = await User.media.resolve(...args);
        // Your custom after-logic here
        return result;
      },
    });
  },
});

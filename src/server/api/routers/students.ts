import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const studentRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.users.findMany({
      where: (user, { eq }) => eq(user.role, "student"),
      columns: { name: true, email: true },
    });
  }),
});

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const staffRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({
      where: (user, { eq }) => eq(user.role, "staff"),
      columns: { name: true, email: true },
    });
  }),
});

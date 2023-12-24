import { users } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

type StudentInsert = Partial<typeof users.$inferInsert>;
const StudentID = z.custom<NonNullable<StudentInsert["id"]>>();

export const staffRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users
      .findMany({
        columns: {
          name: true,
          email: true,
          id: true,
        },
        where: ({ role }, { eq }) => eq(role, "admin")
      })
  }),
  update: protectedProcedure
    .input(z.custom<StudentInsert>().and(z.object({ id: StudentID })))
    .mutation(({ ctx, input: { id, ...user } }) => {
      return ctx.db.update(users).set(user).where(eq(users.id, id));
    }),
  delete: protectedProcedure.input(StudentID).mutation(({ ctx, input: userId }) => {
    return ctx.db.delete(users).where(eq(users.id, userId));
  }),
})

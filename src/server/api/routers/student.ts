import { z } from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

type StudentInsert = Partial<typeof users.$inferInsert>;
const StudentID = z.custom<NonNullable<StudentInsert["id"]>>();

export const studentRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({
      columns: { email: true, name: true, id: true },
      where: ({ role }, { eq }) => eq(role, "student")
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
  promote: adminProcedure
    .input(z.string().min(1))
    .mutation(({ ctx, input: userId }) => {
      return ctx.db.update(users).set({ role: "staff" }).where(eq(users.id, userId));
    }),
});

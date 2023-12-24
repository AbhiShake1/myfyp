import { assignments } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

type AssignmentInsert = typeof assignments.$inferInsert;
const AssignmentID = z.custom<NonNullable<AssignmentInsert["id"]>>();

export const assignmentRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.assignments.findMany({
      columns: { userId: true },
    });
  }),
  create: protectedProcedure
    .input(z.custom<AssignmentInsert>())
    .mutation(({ ctx, input: assignment }) => {
      return ctx.db.insert(assignments).values(assignment);
    }),
  update: protectedProcedure
    .input(z.custom<Partial<AssignmentInsert>>().and(z.object({ id: AssignmentID })))
    .mutation(({ ctx, input: { id, ...assignment } }) => {
      return ctx.db.update(assignments).set(assignment).where(eq(assignments.id, id));
    }),
  delete: protectedProcedure.input(AssignmentID).mutation(({ ctx, input: assignmentId }) => {
    return ctx.db.delete(assignments).where(eq(assignments.id, assignmentId));
  }),
});

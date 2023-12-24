import { createTRPCRouter } from "~/server/api/trpc";
import { assignmentRouter } from "./routers/assignment";
import { chatRouter } from "./routers/chat";
import { studentRouter } from "./routers/student";
import { staffRouter } from "./routers/staff";
import { subscriptionRouter } from "./routers/subscription";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  assignment: assignmentRouter,
  chat: chatRouter,
  staff: staffRouter,
  student: studentRouter,
  studentSubscription: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { createTRPCRouter } from "~/server/api/trpc";
import { assignmentRouter } from "./routers/assignment";
import { chatRouter } from "./routers/chat";
import { postRouter } from "./routers/post";
import { studentRouter } from "./routers/student";
import { subscriptionRouter } from "./routers/subscription";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	assignment: assignmentRouter,
	chat: chatRouter,
	post: postRouter,
	student: studentRouter,
	subscription: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

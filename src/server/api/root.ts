
import { createCallerFactory, createTRPCRouter } from "@components/server/api/trpc";
import { postNota } from "./routers/postNota";
import { getNota } from "./routers/getNota";
import { deleteNota } from "./routers/deleteNota";
import { putNota } from "./routers/putNota";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  salvarNota: postNota,
  getNotas: getNota,
  deleteNota: deleteNota,
  editNota: putNota
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

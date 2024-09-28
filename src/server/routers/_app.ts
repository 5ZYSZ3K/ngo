/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { foundationRouter } from './foundation';
import { foundationRequestsRouter } from './foundationRequests';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  foundation: foundationRouter,
  foundationRequests: foundationRequestsRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;

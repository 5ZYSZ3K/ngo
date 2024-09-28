/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure, protectedProcedure } from '../trpc';
import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Foundation.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultFoundationRequestSelect = {
  id: true,
  text: true,
} satisfies Prisma.FoundationSelect;

export const foundationRequestsRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/v11/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.foundationRequest.findMany({
        select: defaultFoundationRequestSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const foundationRequest = await prisma.foundationRequest.findUnique({
        where: { id },
        select: defaultFoundationRequestSelect,
      });
      if (!foundationRequest) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No foundation with id '${id}'`,
        });
      }
      return foundationRequest;
    }),
  create: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = {
        ...input,
        foundation_id: ctx.user.id,
      };
      await prisma.foundationRequest.create({ data });
    }),
  matchPrompt: publicProcedure
    .input(
      z.object({
        text: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      console.log('matchPrompt', input);
      return await prisma.foundationRequest.findMany({ where: {} });
    }),
});

/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import type { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Default selector for Foundation.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultFoundationSelect = {
  id: true,
  name: true,
  text: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.FoundationSelect;

export const foundationRouter = router({
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

      const items = await prisma.foundation.findMany({
        select: defaultFoundationSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
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
      const foundation = await prisma.foundation.findUnique({
        where: { id },
        select: defaultFoundationSelect,
      });
      if (!foundation) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No foundation with id '${id}'`,
        });
      }
      return foundation;
    }),
  register: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1).max(32),
        text: z.string().min(1),
        login: z.string().min(1).max(32),
        password: z.string().min(1).max(100),
      }),
    )
    .mutation(async ({ input }) => {
      const check = await prisma.foundation.findFirst({
        where: {
          login: input.login,
        },
      });
      if (check) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Foundation with login '${input.login}' already exists`,
        });
      }
      const passwdHash = bcrypt.hashSync(input.password, 10);
      const data = {
        ...input,
        passwdHash,
      };
      delete data.password;
      const foundation = await prisma.foundation.create({
        data,
      });
      return foundation;
    }),
  login: publicProcedure
    .input(
      z.object({
        login: z.string().min(1).max(32),
        password: z.string().min(1).max(100),
      }),
    )
    .mutation(async ({ input }) => {
      const foundation = await prisma.foundation.findFirst({
        where: {
          login: input.login,
        },
      });
      if (!foundation) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No foundation with login '${input.login}'`,
        });
      }
      const verified = bcrypt.compareSync(
        input.password,
        foundation.passwdHash,
      );
      if (!verified) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid password',
        });
      }
      const token = jwt.sign({ id: foundation.id }, process.env.SECRET_KEY!, {
        expiresIn: '1h',
      });
      return { token };
    }),
});

import * as trpcNext from '@trpc/server/adapters/next';
import { decodeAndVerifyJwtToken } from '~/utils/auth';
import { prisma } from './prisma';

export async function createContext({
  req, res
}: trpcNext.CreateNextContextOptions) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const id = decodeAndVerifyJwtToken(
        req.headers.authorization.split(' ')[1],
      );
      if (!id) return null;
      const user = await prisma.foundation.findFirst({
        where: { id },
      });
      return user;
    }
    return null;
  }

  const user = await getUserFromHeader();
  return { user };
}
export type Context = Awaited<ReturnType<typeof createContext>>;

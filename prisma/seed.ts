/**
 * Adds seed data to your db
 *
 * @see https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstFoundationId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  await prisma.foundation.upsert({
    where: {
      id: firstFoundationId,
    },
    create: {
      id: firstFoundationId,
      name: 'Pjeski',
      description:
        'This is an example foundation generated from `prisma/seed.ts`',
      login: 'admin',
      passwdHash: 'admin',
      location: 'Sarajevo',
      warranties: 12,
      isCertified: true,
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

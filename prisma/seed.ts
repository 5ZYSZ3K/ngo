/**
 * Adds seed data to your db
 *
 * @see https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstFoundationId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  const firstFoundationId2 = 'grsgrwgrwgrew';
  await prisma.foundation.upsert({
    where: {
      id: firstFoundationId,
    },
    create: {
      id: firstFoundationId,
      name: 'Stowarzyszenie “Siemacha"',
      description:
        'Prowadzi placówkę dla potrzebujących pomocy dziewcząt i chłopców w wieku szkolnym. Działalność dzienna w formie grupowych zajęć edukacyjnych i artystycznych, pomocy psychologicznej, posiłków oraz wyjazdów integracyjnych. ',
      login: 'admin',
      passwdHash: 'admin',
      location: 'Kraków, Polska',
      warranties: 12,
      isCertified: true,
    },
    update: {},
  });
  await prisma.foundationRequest.upsert({
    where: {
      id: firstFoundationId2,
    },
    create: {
      id: firstFoundationId2,
      shortDescription: 'Potrzebujemy pomocy w zakupie nowych mebli',
      description:
        'Nasza placówka potrzebuje nowych mebli do sali edukacyjnej. Wszystkie meble są już mocno zużyte i nie spełniają swojej funkcji. Potrzebujemy nowych mebli, które posłużą nam przez długie lata.',
      foundation_id: firstFoundationId,
      url: 'https://www.spdim.pl/',
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

import NextError from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card } from '~/components/Card';
import { Container } from '~/components/Container';
import { Header } from '~/components/Header';

import type { NextPageWithLayout } from '~/pages/_app';
import type { RouterOutput } from '~/utils/trpc';
import { trpc } from '~/utils/trpc';

type FoundationByIdOutput = RouterOutput['foundation']['byId'];

function FoundationItem(props: { foundation: FoundationByIdOutput }) {
  const { foundation } = props;
  return (
    <Container>
      <Header />
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>
      <h1 className="text-4xl font-bold">{foundation.name}</h1>
      <em className="text-gray-400">
        Created {foundation.createdAt.toLocaleDateString('en-us')}
      </em>

      <p className="py-4 break-all">{foundation.description}</p>

      <h2 className="text-2xl font-semibold py-2">Raw data:</h2>
      <Card>
        <pre>{JSON.stringify(foundation, null, 4)}</pre>
      </Card>
    </Container>
  );
}

const FoundationViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const foundationQuery = trpc.foundation.byId.useQuery({ id });

  if (foundationQuery.error) {
    return (
      <NextError
        title={foundationQuery.error.message}
        statusCode={foundationQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (foundationQuery.status !== 'success') {
    return (
      <Container>
        <div className="w-full bg-zinc-900/70 rounded-md h-10 animate-pulse mb-2"></div>
        <div className="w-2/6 bg-zinc-900/70 rounded-md h-5 animate-pulse mb-8"></div>

        <div className="w-full bg-zinc-900/70 rounded-md h-40 animate-pulse"></div>
      </Container>
    );
  }
  const { data } = foundationQuery;
  return <FoundationItem foundation={data} />;
};

export default FoundationViewPage;

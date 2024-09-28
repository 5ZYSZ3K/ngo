import NextError from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';

import type { NextPageWithLayout } from '~/pages/_app';
import type { RouterOutput } from '~/utils/trpc';
import { trpc } from '~/utils/trpc';

type FoundationByIdOutput = RouterOutput['foundationRequests']['byId'];

function FoundationRequestItem(props: {
  foundationsRequest: FoundationByIdOutput;
}) {
  const { foundationsRequest } = props;
  return (
    <div className="flex flex-col justify-center h-full px-8 ">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>

      <p className="py-4 break-all">{foundationsRequest.text}</p>

      <h2 className="text-2xl font-semibold py-2">Raw data:</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-x-scroll">
        {JSON.stringify(foundationsRequest, null, 4)}
      </pre>
    </div>
  );
}

const FoundationViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const foundationQuery = trpc.foundationRequests.byId.useQuery({ id });

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
      <div className="flex flex-col justify-center h-full px-8 ">
        <div className="w-full bg-zinc-900/70 rounded-md h-10 animate-pulse mb-2"></div>
        <div className="w-2/6 bg-zinc-900/70 rounded-md h-5 animate-pulse mb-8"></div>

        <div className="w-full bg-zinc-900/70 rounded-md h-40 animate-pulse"></div>
      </div>
    );
  }
  const { data } = foundationQuery;
  return <FoundationRequestItem foundationsRequest={data} />;
};

export default FoundationViewPage;

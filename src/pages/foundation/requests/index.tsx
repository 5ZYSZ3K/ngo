import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../../_app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const IndexPage: NextPageWithLayout = () => {
  const foundationsRequestsQuery = trpc.foundationRequests.matchPrompt.useQuery(
    {
      text: 'XDDDDD',
    },
  );
  const router = useRouter();

  // prefetch all foundations for instant navigation
  // useEffect(() => {
  //   const allfoundations = foundationsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allfoundations) {
  //     void utils.foundation.byId.prefetch({ id });
  //   }
  // }, [foundationsQuery.data, utils]);

  return (
    <div className="flex flex-col bg-gray-800 py-8">
      <h1 className="text-4xl font-bold">Foundation requests</h1>

      <div className="flex flex-col py-8 items-start gap-y-2">
        <div className="flex flex-col"></div>
        <h2 className="text-3xl font-semibold">
          Latest foundation requests
          {foundationsRequestsQuery.status === 'pending' && '(loading)'}
        </h2>

        {/* <button
          className="bg-gray-900 p-2 rounded-md font-semibold disabled:bg-gray-700 disabled:text-gray-400"
          onClick={() => foundationsRequestsQuery.fetchNextPage()}
          disabled={
            !foundationsRequestsQuery.hasNextPage ||
            foundationsRequestsQuery.isFetchingNextPage
          }
        >
          {foundationsRequestsQuery.isFetchingNextPage
            ? 'Loading more...'
            : foundationsRequestsQuery.hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button> */}

        <button
          className="bg-gray-900 p-2 rounded-md font-semibold"
          onClick={() => router.push('/foundation/requests/create')}
        >
          Add a request!
        </button>

        {foundationsRequestsQuery.data?.map((item) => (
          // <Fragment key={page.items[0]?.id ?? index}>
          //   {page.items.map((item) => (
          <article key={item.id}>
            <h3 className="text-2xl font-semibold">{item.id}</h3>
            <Link
              className="text-gray-400"
              href={`/foundation/requests/${item.id}`}
            >
              View more
            </Link>
          </article>
          //   ))}
          // </Fragment>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;

import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../../_app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from '~/components/Container';
import { Header } from '~/components/Header';
import { Fragment } from 'react';
import { Card } from '~/components/Card';

const IndexPage: NextPageWithLayout = () => {
  const foundationsRequestsQuery =
    trpc.foundationRequests.list.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
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
    <Container>
      <Header />
      <div className="flex flex-col py-8 items-start gap-y-2">
        <h1 className="text-5xl font-semibold text-blue-700">
          Baza zapotrzebowań
          {foundationsRequestsQuery.status === 'pending' && '(loading)'}
        </h1>
        <button
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
        </button>
        <button
          className="bg-orange-500 p-2 rounded-md font-semibold"
          onClick={() => router.push('/foundation/requests/create')}
        >
          Zgłoś zapotrzebowanie
        </button>
        <div className="py-5 flex flex-col gap-3">
          {foundationsRequestsQuery.data?.pages.map((page, index) => (
            <Fragment key={page.items[0]?.id ?? index}>
              {page.items.map((item) => (
                <Link
                  className="text-gray-400"
                  key={item.id}
                  href={`/foundation/requests/${item.id}`}
                >
                  <Card>
                    <h3 className="font-semibold text-blue-700 text-3xl">
                      {item.shortDescription}
                    </h3>
                    View more
                  </Card>
                </Link>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default IndexPage;

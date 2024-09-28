import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const IndexPage: NextPageWithLayout = () => {
  const foundationsQuery = trpc.foundation.list.useInfiniteQuery(
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
    <div className="flex flex-col bg-gray-800 py-8">
      <h1 className="text-4xl font-bold">Foundations</h1>

      <div className="flex flex-col py-8 items-start gap-y-2">
        <div className="flex flex-col"></div>
        <h2 className="text-3xl font-semibold">
          Latest foundations
          {foundationsQuery.status === 'pending' && '(loading)'}
        </h2>

        <button
          className="bg-gray-900 p-2 rounded-md font-semibold disabled:bg-gray-700 disabled:text-gray-400"
          onClick={() => foundationsQuery.fetchNextPage()}
          disabled={
            !foundationsQuery.hasNextPage || foundationsQuery.isFetchingNextPage
          }
        >
          {foundationsQuery.isFetchingNextPage
            ? 'Loading more...'
            : foundationsQuery.hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>

        <button
          className="bg-gray-900 p-2 rounded-md font-semibold"
          onClick={() => router.push('/register')}
        >
          Register a foundation!
        </button>

        {foundationsQuery.data?.pages.map((page, index) => (
          <Fragment key={page.items[0]?.id ?? index}>
            {page.items.map((item) => (
              <article key={item.id}>
                <h3 className="text-2xl font-semibold">{item.name}</h3>
                <Link className="text-gray-400" href={`/foundation/${item.id}`}>
                  View more
                </Link>
              </article>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @see https://trpc.io/docs/v11/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.foundation.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };

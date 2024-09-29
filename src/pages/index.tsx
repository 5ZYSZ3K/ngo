import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';
import Link from 'next/link';
import { Fragment } from 'react';
import { Card } from '~/components/Card';
import { Container } from '~/components/Container';
import { Header } from '~/components/Header';

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
          Baza organizacji
          {foundationsQuery.status === 'pending' && '(loading)'}
        </h1>
        <button
          className="p-2 rounded-md font-semibold disabled:bg-gray-200 disabled:text-gray-400"
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
        <div className="py-5 flex flex-col gap-3">
          {foundationsQuery.data?.pages.map((page, index) => (
            <Fragment key={page.items[0]?.id ?? index}>
              {page.items.map((item) => (
                <Link
                  className="text-gray-400"
                  key={item.id}
                  href={`/foundation/${item.id}`}
                >
                  <Card>
                    <h3 className="font-semibold text-blue-700 text-3xl">
                      {item.name}
                    </h3>
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex flex-row items-center gap-4 justify-start">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 58 58"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M52.4659 21.0492C55.4867 18.0283 54.1092 14.5 52.4659 12.7842L45.2159 5.53416C42.1709 2.51332 38.6667 3.89082 36.9509 5.53416L32.8426 9.66666H26.5834C21.9917 9.66666 19.3334 12.0833 17.9801 14.8625L7.25005 25.5925V35.2592L5.53422 36.9508C2.51339 39.9958 3.89089 43.5 5.53422 45.2158L12.7842 52.4658C14.0892 53.7708 15.4909 54.2542 16.8201 54.2542C18.5359 54.2542 20.1067 53.4083 21.0492 52.4658L27.5742 45.9167H36.25C40.3584 45.9167 42.4367 43.355 43.1859 40.8417C45.9167 40.1167 47.4151 38.0383 48.0192 36.0083C51.7651 35.0417 53.1667 31.4892 53.1667 29V21.75H51.7409L52.4659 21.0492ZM48.3334 29C48.3334 30.0875 47.8742 31.4167 45.9167 31.4167H43.5V33.8333C43.5 34.9208 43.0409 36.25 41.0834 36.25H38.6667V38.6667C38.6667 39.7542 38.2076 41.0833 36.25 41.0833H25.5926L17.6659 49.01C16.9167 49.7108 16.4817 49.3 16.2159 49.0342L8.99005 41.8325C8.28922 41.0833 8.70005 40.6483 8.96589 40.3825L12.0834 37.2408V27.5742L16.9167 22.7408V26.5833C16.9167 29.5075 18.8501 33.8333 24.1667 33.8333C29.4834 33.8333 31.4167 29.5075 31.4167 26.5833H48.3334V29ZM49.0342 17.6175L44.9259 21.75H26.5834V26.5833C26.5834 27.6708 26.1242 29 24.1667 29C22.2092 29 21.7501 27.6708 21.7501 26.5833V19.3333C21.7501 18.2217 22.1609 14.5 26.5834 14.5H34.8242L40.3342 8.98999C41.0834 8.28916 41.5184 8.69999 41.7842 8.96582L49.0101 16.1675C49.7109 16.9167 49.3001 17.3517 49.0342 17.6175Z"
                            fill="url(#paint0_linear_16_241)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_16_241"
                              x1="29"
                              y1="3.74847"
                              x2="29"
                              y2="54.2542"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#0009E9" />
                              <stop offset="1" stopColor="#FF8A00" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span className="text-2xl text-orange-500">
                          {item.warranties} poręczeń
                        </span>
                      </div>
                      {item.isCertified ? (
                        <div className="flex flex-row items-center justify-between gap-4">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 52 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_16_253)">
                              <path
                                d="M32.3699 39.25L25.9999 35.5016L19.6299 39.25L21.3199 32.0133L15.7082 27.16L23.0965 26.5316L25.9999 19.75L28.9032 26.5316L36.2915 27.16L30.6799 32.0133M43.3332 1.33331H8.66653V5.66665L19.1965 13.5533C15.5227 15.1211 12.5032 17.9096 10.6485 21.4472C8.79374 24.9848 8.21773 29.0544 9.01783 32.9677C9.81793 36.8811 11.945 40.398 15.0394 42.9238C18.1338 45.4495 22.0055 46.829 25.9999 46.829C29.9942 46.829 33.8659 45.4495 36.9603 42.9238C40.0547 40.398 42.1818 36.8811 42.9819 32.9677C43.782 29.0544 43.206 24.9848 41.3513 21.4472C39.4966 17.9096 36.477 15.1211 32.8032 13.5533L43.3332 5.66665M38.9999 29.5C39.001 31.9619 38.3031 34.3736 36.9872 36.4543C35.6714 38.5351 33.7917 40.1995 31.5669 41.2538C29.3422 42.308 26.8638 42.7089 24.4201 42.4097C21.9764 42.1106 19.6679 41.1236 17.7632 39.5638C15.8585 38.0039 14.4358 35.9353 13.6608 33.5985C12.8858 31.2618 12.7902 28.753 13.3853 26.364C13.9803 23.9751 15.2415 21.8042 17.022 20.104C18.8026 18.4038 21.0293 17.2442 23.4432 16.76C25.13 16.4132 26.8697 16.4132 28.5565 16.76C31.5009 17.3506 34.1499 18.9423 36.0537 21.2647C37.9574 23.5871 38.9985 26.497 38.9999 29.5ZM27.3649 12.1666H24.6349L15.9682 5.66665H36.2049L27.3649 12.1666Z"
                                fill="url(#paint0_linear_16_253)"
                              />
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_16_253"
                                x1="25.9999"
                                y1="1.33331"
                                x2="25.9999"
                                y2="46.829"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#0009E9" />
                                <stop offset="1" stopColor="#FF8A00" />
                              </linearGradient>
                              <clipPath id="clip0_16_253">
                                <rect width="52" height="52" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <span className="text-2xl text-orange-500">
                            certyfikowana organizacja
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <p className="text-blue-700 font-light">
                      {item.description}
                    </p>
                    <div className="flex flex-row items-center justify-between gap-4">
                      <span>{item.location}</span>
                      <span>View more</span>
                    </div>
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

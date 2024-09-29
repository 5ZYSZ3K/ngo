import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../../_app';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/routers/_app';
import { useRouter } from 'next/router';
import { Container } from '~/components/Container';
import { Header } from '~/components/Header';

const RegisterPage: NextPageWithLayout = () => {
  const addFoundationRequest = trpc.foundationRequests.create.useMutation({
    async onSuccess() {
      console.log('Successfully added foundation');
    },
  });
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
      <h1 className="text-4xl font-semibold text-blue-700 text-center">
        Zgłoszenie zapotrzebowania
      </h1>
      <div className="flex flex-col py-8 items-center">
        <form
          className="py-2 w-4/6"
          onSubmit={async (e) => {
            /**
             * In a real app you probably don't want to use this manually
             * Checkout React Hook Form - it works great with tRPC
             * @see https://react-hook-form.com/
             * @see https://kitchen-sink.trpc.io/react-hook-form
             */
            e.preventDefault();
            const $form = e.currentTarget;
            const values = Object.fromEntries(new FormData($form));
            type Input = inferProcedureInput<
              AppRouter['foundationRequests']['create']
            >;
            //    ^?
            const input: Input = {
              description: values.description as string,
              shortDescription: values.shortDescription as string,
            };
            try {
              await addFoundationRequest.mutateAsync(input);

              $form.reset();
              router.push('/foundation/requests/');
            } catch (cause) {
              console.error({ cause }, 'Failed to add foundation');
            }
          }}
        >
          <div className="flex flex-col gap-y-4 font-semibold">
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="shortDescription"
              name="shortDescription"
              type="text"
              placeholder="Tytuł"
              disabled={addFoundationRequest.isPending}
            />
            <textarea
              className="resize-none focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="description"
              name="description"
              placeholder="Opis"
              disabled={addFoundationRequest.isPending}
              rows={6}
            />

            <div className="flex justify-center">
              <input
                className="cursor-pointer p-2 rounded-md px-16 bg-orange-500"
                type="submit"
                disabled={addFoundationRequest.isPending}
                value="Zgłoś"
              />
              {addFoundationRequest.error && (
                <p style={{ color: 'red' }}>
                  {addFoundationRequest.error.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;

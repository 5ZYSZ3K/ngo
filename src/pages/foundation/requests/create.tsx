import { trpc } from '~/utils/trpc';
import type { NextPageWithLayout } from '../../_app';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/routers/_app';
import { useRouter } from 'next/router';

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
    <div className="flex flex-col bg-gray-800 py-8">
      <h1 className="text-4xl font-bold">Add a request</h1>
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
              text: values.text as string,
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
            <textarea
              className="resize-none focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900"
              id="text"
              name="text"
              placeholder="Text"
              disabled={addFoundationRequest.isPending}
              rows={6}
            />

            <div className="flex justify-center">
              <input
                className="cursor-pointer bg-gray-900 p-2 rounded-md px-16"
                type="submit"
                disabled={addFoundationRequest.isPending}
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
    </div>
  );
};

export default RegisterPage;

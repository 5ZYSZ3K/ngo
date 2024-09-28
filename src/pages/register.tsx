import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/routers/_app';
import { useRouter } from 'next/router';

const RegisterPage: NextPageWithLayout = () => {
  const addFoundation = trpc.foundation.register.useMutation({
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
      <h1 className="text-4xl font-bold">Register a foundation</h1>

      <div className="flex flex-col py-8 items-center">
        <h2 className="text-3xl font-semibold pb-2">Add a foundation</h2>

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
              AppRouter['foundation']['register']
            >;
            //    ^?
            const input: Input = {
              name: values.name as string,
              text: values.text as string,
              password: values.password as string,
              login: values.login as string,
            };
            try {
              await addFoundation.mutateAsync(input);

              $form.reset();
              router.push('/login');
            } catch (cause) {
              console.error({ cause }, 'Failed to add foundation');
            }
          }}
        >
          <div className="flex flex-col gap-y-4 font-semibold">
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              disabled={addFoundation.isPending}
            />
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900"
              id="login"
              name="login"
              type="text"
              placeholder="Login"
              disabled={addFoundation.isPending}
            />
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              disabled={addFoundation.isPending}
            />
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900"
              id="rePassword"
              name="rePassword"
              type="password"
              placeholder="Repeat password"
              disabled={addFoundation.isPending}
            />
            <textarea
              className="resize-none focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 bg-gray-900"
              id="text"
              name="text"
              placeholder="Text"
              disabled={addFoundation.isPending}
              rows={6}
            />

            <div className="flex justify-center">
              <input
                className="cursor-pointer bg-gray-900 p-2 rounded-md px-16"
                type="submit"
                disabled={addFoundation.isPending}
              />
              {addFoundation.error && (
                <p style={{ color: 'red' }}>{addFoundation.error.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

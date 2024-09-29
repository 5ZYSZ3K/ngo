import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/routers/_app';
import { useRouter } from 'next/router';
import { Header } from '~/components/Header';
import { Container } from '~/components/Container';

const RegisterPage: NextPageWithLayout = () => {
  const login = trpc.foundation.login.useMutation({
    async onSuccess() {
      console.log('Successfully logged in');
    },
  });
  const router = useRouter();

  return (
    <Container>
      <Header />
      <div className="flex flex-col py-8 items-center">
        <h2 className="text-3xl font-semibold pb-2 text-orange-500">Login</h2>
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
            type Input = inferProcedureInput<AppRouter['foundation']['login']>;
            //    ^?
            const input: Input = {
              password: values.password as string,
              login: values.login as string,
            };
            try {
              const { token } = await login.mutateAsync(input);
              window.localStorage.setItem('token', token);
              $form.reset();
              router.push('/');
            } catch (cause) {
              console.error({ cause }, 'Failed to login');
            }
          }}
        >
          <div className="flex flex-col gap-y-4 font-semibold">
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="login"
              name="login"
              type="text"
              placeholder="Login"
              disabled={login.isPending}
            />
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              disabled={login.isPending}
            />

            <div className="flex justify-center">
              <input
                className="cursor-pointer p-2 rounded-md px-16 bg-orange-500"
                type="submit"
                disabled={login.isPending}
                value="Login"
              />
              {login.error && (
                <p style={{ color: 'red' }}>{login.error.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;

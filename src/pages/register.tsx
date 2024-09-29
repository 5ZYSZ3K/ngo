import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/routers/_app';
import { useRouter } from 'next/router';
import { Header } from '~/components/Header';
import { Container } from '~/components/Container';

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
    <Container>
      <Header />
      <div className="flex flex-col py-8 items-center">
        <form
          className="py-2 w-4/6"
          onSubmit={async (e) => {
            e.preventDefault();
            const $form = e.currentTarget;
            const values = Object.fromEntries(new FormData($form));
            type Input = inferProcedureInput<
              AppRouter['foundation']['register']
            >;
            //    ^?
            const input: Input = {
              name: values.name as string,
              description: values.text as string,
              password: values.password as string,
              login: values.login as string,
              location: values.location as string,
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
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="name"
              name="name"
              type="text"
              placeholder="Nazwa"
              disabled={addFoundation.isPending}
            />
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="login"
              name="login"
              type="text"
              placeholder="Login"
              disabled={addFoundation.isPending}
            />
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="password"
              name="password"
              type="password"
              placeholder="Hasło"
              disabled={addFoundation.isPending}
            />
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="rePassword"
              name="rePassword"
              type="password"
              placeholder="Powtórz hasło"
              disabled={addFoundation.isPending}
            />
            <textarea
              className="resize-none focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="text"
              name="text"
              placeholder="Opis"
              disabled={addFoundation.isPending}
              rows={6}
            />
            <input
              className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl px-4 py-3 shadow-md"
              id="location"
              name="location"
              type="text"
              placeholder="Lokalizacja"
              disabled={addFoundation.isPending}
            />
            <div className="flex justify-center">
              <input
                className="cursor-pointer p-2 rounded-md px-16 bg-orange-500"
                type="submit"
                disabled={addFoundation.isPending}
                value="Zarejestruj"
              />
              {addFoundation.error && (
                <p style={{ color: 'red' }}>{addFoundation.error.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;

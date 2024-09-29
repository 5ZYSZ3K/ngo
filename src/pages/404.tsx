import Link from 'next/link';
import { Container } from '~/components/Container';
import { Header } from '~/components/Header';

export default function Custom404() {
  return (
    <Container>
      <Header />
      <Link href="/" className="text-gray-300 underline">
        Home
      </Link>
      <div className="flex flex-col">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-4xl font-bold">Page not found</h2>
      </div>
    </Container>
  );
}

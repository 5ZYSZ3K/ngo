import Link from 'next/link';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="flex flex-row justify-between mt-10 mb-5 items-center">
      <div className="flex flex-col">
        <h1 className="text-blue-700 font-bold text-5xl ml-4">
          Applied Destiny
        </h1>
        <h1 className="text-orange-500 font-medium text-4xl italic ml-12 indent-9 -translate-y-1">
          Pomagaj przez NGO
        </h1>
      </div>
      <div className="flex flex-row items-center">
        <h1 className="text-zinc-500 text-2xl italic underline inline">
          Fundacja lub wolontariusz?
        </h1>
        <Link href="/register">
          <button className="flex bg-orange-500 text-white font-bold py-2 px-4 rounded-2xl ml-5 text-2xl flex-row items-center gap-4 shadow-md">
            Dołącz
            <div className="bg-white rounded-3xl h-7 w-7 items-center justify-center flex">
              <svg
                width="16"
                height="12"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L2 10.5ZM31.0607 13.0607C31.6464 12.4749 31.6464 11.5251 31.0607 10.9393L21.5147 1.3934C20.9289 0.807613 19.9792 0.807613 19.3934 1.3934C18.8076 1.97919 18.8076 2.92893 19.3934 3.51472L27.8787 12L19.3934 20.4853C18.8076 21.0711 18.8076 22.0208 19.3934 22.6066C19.9792 23.1924 20.9289 23.1924 21.5147 22.6066L31.0607 13.0607ZM2 13.5L30 13.5L30 10.5L2 10.5L2 13.5Z"
                  fill="#636363"
                />
              </svg>
            </div>
          </button>
        </Link>
      </div>
    </header>
  );
};

import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Card: FC<Props> = ({ children }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-10 flex flex-col gap-4">
      {children}
    </div>
  );
};

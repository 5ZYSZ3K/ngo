import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Container: FC<Props> = ({ children }) => {
  return <div className="flex flex-col mx-12">{children}</div>;
};

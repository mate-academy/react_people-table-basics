import { FC, ReactNode } from 'react';

type TTitleProps = {
  children: ReactNode;
};

export const Title: FC<TTitleProps> = ({ children }) => (
  <h1 className="title">{children}</h1>
);

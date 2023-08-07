import React from 'react';
import { Header } from './Header';

type Props = {
  children: React.ReactNode,
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  );
};

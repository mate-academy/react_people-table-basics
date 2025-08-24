import { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">{children}</div>
    </main>
  </div>
);

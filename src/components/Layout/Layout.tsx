import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MainNav } from '../MainNav/MainNav';

export const Layout: FC = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

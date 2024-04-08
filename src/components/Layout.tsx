import { FC } from 'react';
import { NavPage } from './NavPage';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
  return (
    <div data-cy="app">
      <NavPage />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

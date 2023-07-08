import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MainNav } from '../MainNav';

export const LayoutRouter: FC = () => (
  <>
    <div data-cy="app">
      <MainNav />
    </div>
    <Outlet />
  </>
);

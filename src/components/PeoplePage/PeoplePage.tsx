import { FC } from 'react';
import { Outlet } from 'react-router';

export const PeoplePage: FC = () => (
  <>
    <h2
      className="title is-2"
    >
      People page
    </h2>
    <Outlet />
  </>
);

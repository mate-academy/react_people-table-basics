import React from 'react';
import { Outlet } from 'react-router-dom';
import { HeadOfTable } from '../TableHead/TableHead';

export const Navigation: React.FC = () => {
  return (
    <>
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <HeadOfTable />
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

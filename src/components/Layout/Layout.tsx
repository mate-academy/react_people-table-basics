import classNames from 'classnames';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const Layout: React.FC = () => {
  return (
    <div>
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink to="/" className={getLinkClassName}>
              Home
            </NavLink>

            <NavLink to="people" className={getLinkClassName}>
              People
            </NavLink>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

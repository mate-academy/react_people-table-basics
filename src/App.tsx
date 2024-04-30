import React from 'react';
import './App.scss';
import cn from 'classnames';

import { NavLink, Outlet } from 'react-router-dom';

const setNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const App: React.FC = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={setNavLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={setNavLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

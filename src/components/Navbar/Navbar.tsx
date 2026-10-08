import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

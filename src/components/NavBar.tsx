import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const NavBar: React.FC = () => {
  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return cn('navbar-item has-background-grey-lighter');
    }

    return cn('navbar-item');
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to={'/'} className={isActiveLink}>
            Home
          </NavLink>
          <NavLink to={'/people'} className={isActiveLink}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

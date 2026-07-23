import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <nav
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

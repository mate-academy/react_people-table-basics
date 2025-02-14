import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkActive}>
            Home
          </NavLink>

          <NavLink to="people" className={getLinkActive}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const HeadOfTable: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>

          <NavLink className={getNavLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

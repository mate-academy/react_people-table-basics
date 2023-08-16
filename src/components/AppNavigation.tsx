import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const getNavLinkClass = (
  { isActive }: { isActive: boolean },
) => cn('navbar-item', {
  'has-background-grey-lighter': isActive,
});

export const AppNavigation: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={getNavLinkClass}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={getNavLinkClass}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

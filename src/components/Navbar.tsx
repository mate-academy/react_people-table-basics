import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => (
    classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )
  );

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getNavLinkClasses}>
            Home
          </NavLink>

          <NavLink to="people" className={getNavLinkClasses}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

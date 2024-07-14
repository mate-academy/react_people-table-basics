import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '../config/routerConfig';

export const Navbar = ({}) => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {Object.entries(RoutePath).map(
            ([routeName, path]: [string, string]) => {
              return (
                <NavLink key={path} to={path} className={linkClasses}>
                  {routeName}
                </NavLink>
              );
            },
          )}
        </div>
      </div>
    </nav>
  );
};

import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const classes = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  })
);

export const Nav: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={classes} to="/">Home</NavLink>
          <NavLink className={classes} to="/people">People</NavLink>
        </div>
      </div>
    </nav>
  );
};

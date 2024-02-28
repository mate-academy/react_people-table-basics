import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const classNameFunction = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={classNameFunction} to="/">
            Home
          </NavLink>

          <NavLink className={classNameFunction} to="people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

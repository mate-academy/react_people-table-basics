import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navbar: React.FC = () => (
  <nav className="navbar is-light" data-cy="nav">
    <div className="navbar-brand">
      <NavLink to="/" end className={getLinkClass}>
        Home
      </NavLink>
      <NavLink to="/people" className={getLinkClass}>
        People
      </NavLink>
    </div>
  </nav>
);

import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  return (
    <nav className="navbar" data-cy="Nav">
      <NavLink to="/" className={getLinkClass} end>
        Home
      </NavLink>
      <NavLink to="/people" className={getLinkClass}>
        People
      </NavLink>
    </nav>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};

const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/people" className={getLinkClasses}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

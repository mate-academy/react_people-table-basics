import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import React from 'react';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  }));

const NavBar : React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

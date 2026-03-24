import React from 'react';
import { NavBarHome } from '../NavBarHome';
import { NavBarPeople } from '../NavBarPeople';

export const NavBar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavBarHome />
          <NavBarPeople />
        </div>
      </div>
    </nav>
  );
};

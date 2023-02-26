import React from 'react';
import { NavLinkPage } from '../NavLink';

export const NavBar:React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">

          <NavLinkPage to="/" text="Home" />

          <NavLinkPage to="/people" text="People" />

        </div>
      </div>
    </nav>
  );
};

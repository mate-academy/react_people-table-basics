import React from 'react';
import { NavItem } from '../NavItem';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavItem
          to="/"
          title="Home"
        />
        <NavItem
          to="people"
          title="People"
        />
      </div>
    </div>
  </nav>
);

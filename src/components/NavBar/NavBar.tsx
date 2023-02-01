import React, { memo } from 'react';
import { NavBarItems } from '../NavBarItems/NavBarItems';

export const NavBar: React.FC = memo(() => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavBarItems to="/" title="Home" />
        <NavBarItems to="/people" title="People" />
      </div>
    </div>
  </nav>
));

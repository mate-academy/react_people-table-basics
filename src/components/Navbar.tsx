import React, { memo } from 'react';
import { NavBarLink } from './NavBarLink';

export const NavBar: React.FC = memo(() => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavBarLink to="/" title="Home" />
        <NavBarLink to="/people" title="People" />
      </div>
    </div>
  </nav>
));

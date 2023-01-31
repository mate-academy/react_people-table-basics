import React, { memo } from 'react';
import { PageNavLink } from '../PageNavLink';

export const Navbar: React.FC = memo(() => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" navTitle="Home" />
        <PageNavLink to="/people" navTitle="People" />
      </div>
    </div>
  </nav>
));

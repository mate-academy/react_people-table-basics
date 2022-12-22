import React from 'react';
import { PageNavLink } from '../PageNavLink';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" tab="Home" />

        <PageNavLink to="/people" tab="People" />
      </div>
    </div>
  </nav>
);

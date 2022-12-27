import React from 'react';
import { PageNavLink } from './PageNavLink';

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

          <PageNavLink to="/" title="Home" />

          <PageNavLink to="/people" title="People" />

        </div>
      </div>
    </nav>
  );
};

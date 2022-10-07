// import React from 'react';
import { PageNavLink } from './PageNavLink';

export const MainNav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" textLink="Home" />
        <PageNavLink to="people" textLink="People" />

      </div>
    </div>
  </nav>
);

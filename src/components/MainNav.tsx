// import React from 'react';
import { PageNavKink } from './PageNavLink';

export const MainNav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavKink to="/" textLink="Home" />
        <PageNavKink to="people" textLink="People" />

      </div>
    </div>
  </nav>
);

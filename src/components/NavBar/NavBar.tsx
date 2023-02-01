import React from 'react';
import { PageNavLink } from '../PageNavLink/PageNavLInk';

export const NavBar: React.FC = React.memo(() => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageNavLink to="/" linkTitle="Home" />
          <PageNavLink to="/people" linkTitle="People" />
        </div>
      </div>
    </nav>
  );
});

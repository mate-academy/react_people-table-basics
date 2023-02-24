import React from 'react';
import { PageLink } from '../PageLink';

export const Navbar: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <PageLink to="/people" text="People" />
          <PageLink to="/" text="Home" />
        </div>
      </div>
    </nav>
  );
};

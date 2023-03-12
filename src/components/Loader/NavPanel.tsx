import React from 'react';

import { NavPageItem } from './NavPageItem';

export const NavPage: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavPageItem link="/" text="Home" />
          <NavPageItem link="/people" text="People" />
        </div>
      </div>
    </nav>
  );
};

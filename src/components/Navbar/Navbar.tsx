import React, { memo } from 'react';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';

export const Navbar: React.FC = memo(() => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <CustomNavLink to="/" title="Home" />
          <CustomNavLink to="/people" title="People" />
        </div>
      </div>
    </nav>
  );
});

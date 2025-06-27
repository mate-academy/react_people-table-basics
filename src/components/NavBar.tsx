import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const isActiveClassname = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={isActiveClassname} to="/">
            Home
          </NavLink>

          <NavLink className={isActiveClassname} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

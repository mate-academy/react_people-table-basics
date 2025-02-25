import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/',
    className: 'navbar-item',
    text: 'Home',
  },
  {
    to: '/people',
    className: 'navbar-item',
    text: 'People',
  },
];

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? `${item.className} has-background-grey-lighter`
                : `${item.className}`
            }
          >
            {item.text}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);

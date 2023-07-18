import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  path: string
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({ to, path }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      'navbar-item', {
        'has-background-grey-lighter': isActive,
      },
    )}
  >
    {path}
  </NavLink>
);

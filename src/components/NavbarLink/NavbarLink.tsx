import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export type Props = {
  to: string;
  text: string;
};

export const NavbarLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);

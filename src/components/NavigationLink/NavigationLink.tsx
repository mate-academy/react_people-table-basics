import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  title: string;
};

export const NavigationLink: React.FC<Props> = ({ to, title }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn('navbar-item', {
      'navbar-item has-background-grey-lighter': isActive,
    })}
  >
    {title}
  </NavLink>
);

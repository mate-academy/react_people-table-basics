import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  path: string,
  title: string,
}

export const NavBarItem: React.FC<Props> = ({ path, title }) => (
  <NavLink
    className={({ isActive }) => cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
    to={path}
  >
    {title}
  </NavLink>
);

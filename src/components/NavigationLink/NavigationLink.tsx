import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  title: string;
}

export const NavigationLink: React.FC<Props> = ({ to, title }) => {
  return (
    <NavLink
      className={({ isActive }) => cn(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
      to={to}
    >
      {title}
    </NavLink>
  );
};

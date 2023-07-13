import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  title: string,
};

export const PageNavLink: React.FC<Props> = ({ to, title }) => {
  return (
    <NavLink
      className={({ isActive }) => cn('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
      to={to}
    >
      {title}
    </NavLink>
  );
};

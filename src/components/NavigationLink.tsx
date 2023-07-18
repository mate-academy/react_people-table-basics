import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string,
  to: string,
};

export const NavigationLink: React.FC<Props> = ({ title, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {title}
    </NavLink>
  );
};

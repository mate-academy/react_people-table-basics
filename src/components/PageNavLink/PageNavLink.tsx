import React, { memo } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  navTitle: string;
};

export const PageNavLink: React.FC<Props> = memo(
  ({ to, navTitle }) => (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {navTitle}
    </NavLink>
  ),
);

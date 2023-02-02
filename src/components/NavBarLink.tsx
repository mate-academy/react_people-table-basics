import React, { memo } from 'react';
import { NavLink, To } from 'react-router-dom';
import className from 'classnames';

type Props = {
  to: To,
  title: string,
};

export const NavBarLink: React.FC<Props> = memo(
  ({ to, title }) => (
    <NavLink
      to={to}
      className={({ isActive }) => className(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {title}
    </NavLink>
  ),
);

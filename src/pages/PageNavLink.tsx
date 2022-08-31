import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';

type Props = {
  to: string;
  name: string;
};

export const PageNavLink: FC<Props> = ({ to, name }) => (
  <NavLink
    className={({ isActive }) => cn(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={to}
  >
    {name}
  </NavLink>
);

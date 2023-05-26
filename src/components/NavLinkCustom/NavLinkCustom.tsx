import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  title: string;
}

export const NavLinkCustom: FC<Props> = ({ to, title }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
  >
    {title}
  </NavLink>
);

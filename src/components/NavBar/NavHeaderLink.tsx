import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  title: string,
  directTo: string,
}

export const NavHeaderLink:FC<Props> = ({ title, directTo }) => (
  <NavLink
    to={directTo}
    className={({ isActive }) => cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
  >
    {title}
  </NavLink>
);

import { FC } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  text: string;
}

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => cn('navbar-item',
      { 'has-background-grey-lighter': isActive })}
    to={to}
  >
    {text}
  </NavLink>
);

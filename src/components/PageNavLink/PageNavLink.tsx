import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  text: string,
  to: string,
}

export const PageNavLink: FC<Props> = ({ text, to }) => (
  <NavLink
    className={({ isActive }) => cn('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
    to={`${to}`}
  >
    {text}
  </NavLink>
);

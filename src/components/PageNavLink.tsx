import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink:FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
);

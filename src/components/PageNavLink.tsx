import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    end
    to={to}
    className={({ isActive }) => classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);

export const PageNavLink2: FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);

import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string
  text: string
  end?: boolean
};
export const NavigationPage:FC<Props> = ({ to, text, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => (
      classNames('navbar-item', { 'has-background-grey-lighter': isActive })
    )}
  >
    {text}
  </NavLink>
);

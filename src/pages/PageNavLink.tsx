import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

type Props = {
  to: string;
  text: string;
  end: boolean;
};

export const PageNavLink: React.FC<Props> = ({ to, text, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);

/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string;
  text: string;
  end?: boolean;
};

export const PageNavLink: React.FC<Props> = ({ to, text, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cn('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
    >
      {text}
    </NavLink>
  );
};

import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  link: string,
  title: string
};

export const NavigationLink: React.FC<Props> = ({ link, title }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => classNames(
        'navbar-item',
        { 'has-background-grey-lighter': isActive },
      )}
    >
      {title}
    </NavLink>
  );
};

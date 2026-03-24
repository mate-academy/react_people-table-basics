import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

export const NavBarHome: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Link
      to="/"
      className={classNames('navbar-item', {
        'has-background-grey-lighter': pathname === '/',
      })}
    >
      Home
    </Link>
  );
};

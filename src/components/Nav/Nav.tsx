import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Nav: React.FC = () => (
  <div className="navbar-brand">
    <NavLink className={getLinkClass} to="/">
      Home
    </NavLink>

    <NavLink className={getLinkClass} to="people">
      People
    </NavLink>
  </div>
);

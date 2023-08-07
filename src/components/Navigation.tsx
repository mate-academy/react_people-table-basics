// import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Page } from '../types/Page';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

const getLinkStyle = (
  { isActive }: { isActive: boolean },
) => ({ color: isActive ? '#485fc7' : '' });

export const Navigation = () => {
  return (
    <>
      <nav
        className="navbar is-light is-fixed-top is-mobile has-shadow"
        data-cy="Nav"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={getLinkClass}
              style={getLinkStyle}
            >
              {Page.Home}
            </NavLink>
            <NavLink
              to="people"
              className={getLinkClass}
              style={getLinkStyle}
            >
              {Page.People}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

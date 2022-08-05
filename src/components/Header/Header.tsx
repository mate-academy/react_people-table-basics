import classNames from 'classnames';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header:FC = () => {
  const activeLink = (isActive: boolean) => {
    return classNames(
      'navbar-item',
      { 'is-active': isActive },
    );
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/home">
            <span className="is-size-1">Home</span>
          </Link>
        </div>
        <div id="navbarMenuHeroB" className="navbar-menu">
          <div className="navbar-end">
            <NavLink
              to="/"
              className={({ isActive }) => activeLink(isActive)}
            >
              Home page
            </NavLink>

            <NavLink
              to="people"
              className={({ isActive }) => activeLink(isActive)}
            >
              People
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

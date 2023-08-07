import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

const navLinkIsActive = ({ isActive }: { isActive: boolean }) => (
  classNames(
    'navbar-item', { 'has-background-grey-lighter': isActive },
  ));

export const Navbar :FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={navLinkIsActive} to="/">
          Home
        </NavLink>

        <NavLink
          className={navLinkIsActive}
          to="people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

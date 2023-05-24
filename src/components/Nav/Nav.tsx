import cn from 'classnames';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = memo(() => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={
            (({ isActive }) => cn('navbar-item', {
              'has-background-grey-lighter': isActive,
            }))
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={
            (({ isActive }) => cn('navbar-item', {
              'has-background-grey-lighter': isActive,
            }))
          }
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
));

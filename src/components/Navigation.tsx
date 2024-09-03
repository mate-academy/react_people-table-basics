import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getNavLinkClass = (isActive: boolean) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to="/">
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => getNavLinkClass(isActive)}
          to="people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

function activeNav({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
}

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={activeNav}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={activeNav}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

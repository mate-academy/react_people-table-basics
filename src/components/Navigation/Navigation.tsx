import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames('navbar-item', {
  'is-active': isActive,
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
        <NavLink
          to="/"
          className={getLinkClass}
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          className={getLinkClass}
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

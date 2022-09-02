import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const applyClassNames = ({ isActive } : { isActive: boolean }) => (
  classNames(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  )
);

export const Nav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={applyClassNames}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={applyClassNames}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);

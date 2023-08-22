import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getActiveLink = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

export const Navigation = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              className={getActiveLink}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={getActiveLink}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

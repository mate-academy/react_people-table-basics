import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getNavStyles = (
  { isActive }: { isActive: boolean },
) => classNames('navbar-item', {
  'has-background-grey-lighter': isActive,
});

export const Nav = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavStyles} to="/">
            Home
          </NavLink>

          <NavLink
            className={getNavStyles}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

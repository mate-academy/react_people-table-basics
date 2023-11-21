import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const PeopleNav = () => {
  const getIsActive = ({ isActive }: { isActive: boolean }) => cn(
    'navbar-item', { 'has-background-grey-lighter': isActive },
  );

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={getIsActive}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getIsActive}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

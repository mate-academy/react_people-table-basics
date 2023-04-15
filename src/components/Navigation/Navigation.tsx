import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { LinkType } from '../../types/Links';

export const Navigation = () => {
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
            className={({ isActive }) => classNames(
              'navbar-item',
              {
                'has-background-grey-lighter': isActive,
              },
            )}
            to={LinkType.HomePage}
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) => classNames(
              'navbar-item',
              {
                'has-background-grey-lighter': isActive,
              },
            )}
            to={LinkType.PeoplePage}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

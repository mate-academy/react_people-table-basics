import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { PageRoutes } from '../../types/PageRoutes';

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
            to={PageRoutes.HomePage}
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
            to={PageRoutes.PeoplePage}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

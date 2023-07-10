import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navigation: React.FC = () => {
  const currentPath = window.location.pathname;

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
            to="/"
            className={cn(
              'navbar-item', {
                'has-background-grey-lighter': currentPath === '/',
              },
            )}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={cn(
              'navbar-item', {
                'has-background-grey-lighter': currentPath === '/people',
              },
            )}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

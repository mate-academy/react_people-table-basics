import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const locationPathname: string = useLocation().pathname;

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
            className={cn({
              'navbar-item': true,
              'has-background-grey-lighter': locationPathname === '/',
            })}
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink
            className={cn({
              'navbar-item': true,
              'has-background-grey-lighter': locationPathname === '/people',
            })}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

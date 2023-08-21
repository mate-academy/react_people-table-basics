import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            className={cn('navbar-item',
              { 'has-background-grey-lighter': location.pathname === '/' })}
            to="/"
          >
            Home
          </Link>

          <Link
            className={cn('navbar-item',
              {
                'has-background-grey-lighter':
                location.pathname.includes('/people'),
              })}
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

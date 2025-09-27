import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const isPeople = pathname.startsWith('/people');

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
            to="/"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isHome,
            })}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isPeople,
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

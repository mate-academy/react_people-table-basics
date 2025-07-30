import { Link, useLocation } from 'react-router-dom';

export const Nav: React.FC = () => {
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
            className={`navbar-item ${location.pathname === '/home' ? 'has-background-grey-lighter' : ''}`}
            to={'/home'}
          >
            Home
          </Link>

          <Link
            className={`navbar-item ${location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
            to={'/people'}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

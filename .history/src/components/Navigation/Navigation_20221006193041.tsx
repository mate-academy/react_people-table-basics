import { Link } from 'react-router-dom';

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
          <NavLink className="navbar-item" to="/">
            Home
          </Link>

          <Link
            className="navbar-item has-background-grey-lighter"
            to="/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

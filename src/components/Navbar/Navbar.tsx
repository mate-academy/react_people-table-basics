import React from 'react';
import { Link, useMatch } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const homeMatch = useMatch({ path: '/', end: true });
  const peopleMatch1 = useMatch('/people/*');
  const peopleMatch2 = useMatch('/people');

  const isHomePage = Boolean(homeMatch);
  const isPeoplePage = Boolean(peopleMatch1 || peopleMatch2);

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
            className={`navbar-item ${isHomePage ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={`navbar-item ${isPeoplePage ? 'has-background-grey-lighter' : ''}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

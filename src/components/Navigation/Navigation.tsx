import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [selectedNavLink, setSelectedNavLink] = useState<string>('');

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
            className={classNames(
              'navbar-item',
              { 'has-background-grey-lighter': selectedNavLink === 'Home' },
            )}
            to="/"
            onClick={() => setSelectedNavLink('Home')}
          >
            Home
          </Link>

          <Link
            className={classNames(
              'navbar-item',
              { 'has-background-grey-lighter': selectedNavLink === 'People' },
            )}
            to="people"
            onClick={() => setSelectedNavLink('People')}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

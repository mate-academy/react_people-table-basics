import { Link, useLocation } from 'react-router-dom';

import './App.scss';
import { Root } from './Root';

export const App = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link
              className={`navbar-item ${pathName === '/' && 'has-background-grey-lighter'}`}
              to="/"
            >
              Home
            </Link>

            <Link
              className={`navbar-item ${pathName.startsWith('/people') && 'has-background-grey-lighter'}`}
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Root />
        </div>
      </main>
    </div>
  );
};

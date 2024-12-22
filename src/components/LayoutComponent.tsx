import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export function LayoutComponent({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isHomeActive = location.pathname === '/' ? true : false;
  const isPeopleActive = location.pathname.startsWith('/people') ? true : false;

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
            <a
              className={`navbar-item ${isHomeActive ? 'has-background-grey-lighter' : ''}`}
              href="#/"
            >
              Home
            </a>

            <a
              className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
              href="#/people"
            >
              People
            </a>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}

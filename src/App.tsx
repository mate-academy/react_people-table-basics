import './App.scss';
import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

type Page = 'home' | 'people';

export const App = () => {
  const [page, setPage] = useState<Page>('home');

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
              className="navbar-item"
              href="#/"
              onClick={() => setPage('home')}
            >
              Home
            </a>

            <a
              className="navbar-item has-background-grey-lighter"
              href="#/people"
              onClick={() => setPage('people')}
            >
              People
            </a>
          </div>
        </div>
      </nav>

      <main className="section">
        {page === 'home' && <HomePage />}
        {page === 'people' && <PeoplePage />}
      </main>
    </div>
  );
};

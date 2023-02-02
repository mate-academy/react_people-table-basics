import { useEffect, useState } from 'react';
import './App.scss';

import { getPeople } from './api';
import { PeopleTable } from './components/PeopleTable.tsx/PeopleTable';
import { Loader } from './components/Loader';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsLoadError(true))
      .finally(() => setIsLoading(false));
  }, []);

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
            <a className="navbar-item" href="#/">
              Home
            </a>

            <a
              className="navbar-item has-background-grey-lighter"
              href="#/people"
            >
              People
            </a>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          {/* <h1 className="title">Home Page</h1> */}
          <h1 className="title">People Page</h1>
          {/* <h1 className="title">Page not found</h1> */}

          <div className="block">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <PeopleTable people={people} />
              )}

              {isLoadError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.scss';
import { Person } from './types';
import { getPeople } from './api';
import { PeoplePage } from './components/People/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  const showLoader = people === null && !isError;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true));
  }, [people?.length]);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <Navbar setPeople={setPeople} />
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage
                    showLoader={showLoader}
                    showError={isError}
                    people={people}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    showLoader={showLoader}
                    showError={isError}
                    people={people}
                  />
                )}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

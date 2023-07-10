import {
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { getPeople } from './api';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isDataUploaded, setIsDataUploaded] = useState(false);

  useEffect(() => {
    getPeople()
      .then(uploadedPeople => {
        setPeople(uploadedPeople);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsDataUploaded(true);
      });
  }, []);

  const findMotherSlug = useCallback((child: Person): string | null => {
    const mother = people.find(person => person.name === child.motherName);

    if (mother) {
      return mother.slug;
    }

    return null;
  }, [people]);

  const findFatherSlug = useCallback((child: Person): string | null => {
    const father = people.find(person => person.name === child.fatherName);

    if (father) {
      return father.slug;
    }

    return null;
  }, [people]);

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
            <NavLink
              to="/"
              className={({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeoplePage
                    isError={isError}
                    people={people}
                    isDataUploaded={isDataUploaded}
                    findMotherSlug={findMotherSlug}
                    findFatherSlug={findFatherSlug}
                  />
                )}
              />

              <Route
                path=":personSlug"
                element={(
                  <PeoplePage
                    isError={isError}
                    people={people}
                    isDataUploaded={isDataUploaded}
                    findMotherSlug={findMotherSlug}
                    findFatherSlug={findFatherSlug}
                  />
                )}
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>

        </div>
      </main>
    </div>
  );
};

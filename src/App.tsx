import {
  Routes,
  Route,
  Navigate,
  NavLink,
  // useParams,
} from 'react-router-dom';
import './App.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { getPeople } from './api';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  // const [isError, setIsError] = useState(false);
  const [isDataUploaded, setIsDataUploaded] = useState(false);

  useEffect(() => {
    getPeople()
      .then(uploadedPeople => {
        setPeople(uploadedPeople);
        setIsDataUploaded(true);
      })
      .catch(() => {
        // setIsError(true);
      });
  }, []);

  const findMotherSlug = (child: Person): string | null => {
    const mother = people.find(person => person.name === child.motherName);

    if (mother) {
      return mother.slug;
    }

    return null;
  };

  const findFatherSlug = (child: Person): string | null => {
    const father = people.find(person => person.name === child.fatherName);

    if (father) {
      return father.slug;
    }

    return null;
  };

  // const persss = useParams();
  // console.log(persss)

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

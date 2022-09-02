import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
  Navigate, NavLink, Route, Routes, useParams,
} from 'react-router-dom';
import { getPeople } from './api';
import { Loader } from './components/Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from './types';

interface Props {
  people: Person[];
}
export const PeoplePage: React.FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} selectedPerson={slug} />
    </>
  );
};

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setIsError(true);
      });
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
            <NavLink
              to="/"
              className={({ isActive }) => classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              Home
            </NavLink>

            <NavLink
              end
              to="/people"
              className={({ isActive }) => classNames('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">

          <div className="block">
            <div className="box table-container">
              {loading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {/* <p data-cy="noPeopleMessage">
                There are no people on the server
              </p> */}

              <Routes>
                <Route
                  path="people"

                >
                  <Route
                    index
                    element={<PeoplePage people={people} />}
                  />
                  <Route
                    path=":slug"
                    element={<PeoplePage people={people} />}
                  />
                </Route>

                <Route
                  path="/"
                  element={<h1 className="title">Home Page</h1>}
                />
                <Route
                  path="home"
                  element={<Navigate to="/" replace />}
                />

                <Route
                  path="*"
                  element={<h1 className="title">Page not found</h1>}
                />
              </Routes>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

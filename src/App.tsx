import {
  NavLink, Navigate, Route, Routes, useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import * as peopleService from './api';

import './App.scss';
import { Person } from './types';
import { PeoplesList } from './components/PeoplesList';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  })
);

export const App = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getPeoples = () => {
    setIsLoading(true);

    return peopleService.getPeople()
      .then(peopleFromServer => setPeoples(peopleFromServer))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getPeoples();
  }, []);

  // console.log(peoples);

  const { personId } = useParams();

  console.log(personId);

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
              className={getLinkClass}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={getLinkClass}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route
              path="people"
              element={<h1 className="title">People Page</h1>}
            />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>

          <div className="block">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!isLoading && peoples.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && (
                <PeoplesList peoples={peoples} />
                // <Outlet />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

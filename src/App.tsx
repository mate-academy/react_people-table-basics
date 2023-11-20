import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';

import './App.scss';

import { Person } from './types';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/peoplePage';
import { getPeople } from './api';

export const App = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPeople = async () => {
    setLoading(true);
    try {
      const peopleData = await getPeople();

      setPeopleList(peopleData);
    } catch {
      setLoadingError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
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
              className={
                ({ isActive }) => cn('navbar-item',
                  { 'has-background-grey-lighter': isActive })
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={
                ({ isActive }) => cn('navbar-item',
                  { 'has-background-grey-lighter': isActive })
              }
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="people"
              element={
                (
                  <PeoplePage
                    peopleList={peopleList}
                    loadingError={loadingError}
                    loading={loading}
                  />
                )
              }
            >
              <Route
                path=":slug"
                element={
                  (
                    <PeoplePage
                      peopleList={peopleList}
                      loadingError={loadingError}
                      loading={loading}
                    />
                  )
                }
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Person } from './types';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { HomePage } from './components/HomePage/HomePage';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [LoadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPeople = async () => {
    setIsLoading(true);
    setLoadingError(false);
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetPeople();
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
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
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
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={
                <PeoplePage
                  people={people}
                  LoadingError={LoadingError}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/people/:slug"
              element={
                <PeoplePage
                  people={people}
                  LoadingError={LoadingError}
                  isLoading={isLoading}
                />
              }
            />
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

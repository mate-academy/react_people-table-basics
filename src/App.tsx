import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  NavLink,
} from 'react-router-dom';

import { Person } from './types/Person';
import { getPeople } from './api';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import './App.scss';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  const loadPeople = async () => {
    try {
      setLoading(true);
      setError(false);

      const peopleFromApi = await getPeople();

      setPeople(peopleFromApi);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/people')) {
      loadPeople();
    }
  }, [location.pathname]);

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
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) =>
                `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
              }
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
                <PeoplePage people={people} loading={loading} error={error} />
              }
            />
            <Route
              path="/people/:slug"
              element={
                <PeoplePage people={people} loading={loading} error={error} />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

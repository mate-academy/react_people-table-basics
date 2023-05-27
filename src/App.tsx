import React, { useEffect, useState } from 'react';
import {
  useNavigate, Route, Routes, Link,
} from 'react-router-dom';
import { HomePage } from './components/homePage';
import { People } from './components/peoplePage';
import { getPeople } from './api';
import { Person } from './types';
import { NotFoundPage } from './components/notFoundPage';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  async function peopleArr() {
    try {
      const fetchedData = await getPeople();

      setLoading(false);
      setPeople(fetchedData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error occurred:', error);
      setLoadingError(true);
    }
  }

  useEffect(() => {
    peopleArr();
  });

  useEffect(() => {
    const handleGoBack = () => {
      navigate('/another-page', { replace: true });
    };

    window.addEventListener('popstate', handleGoBack);

    return () => {
      window.removeEventListener('popstate', handleGoBack);
    };
  }, [navigate]);

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
            <Link
              className="navbar-item"
              replace
              to="/"
            >
              Home
            </Link>
            <Link
              className="navbar-item"
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/people"
          element={(
            <People
              people={people}
              isLoading={isLoading}
              loadingError={loadingError}
            />
          )}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

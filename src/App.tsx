import React, { useEffect, useState } from 'react';
import {
  Route, Routes, NavLink, Navigate, useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import { HomePage } from './components/HomePage';
import { People } from './components/PeoplePage';
import { getPeople } from './api';
import { Person } from './types';
import { NotFoundPage } from './components/NotFoundPage';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [selectedName, setSelectedName] = useState<string | undefined>('');
  const [selectedPerson, setSelectedPerson] = useState<string>(
    localStorage.getItem('selectedPersonSlug') || '',
  );

  const location = useLocation();

  const isHomePage = location.pathname.endsWith('/home');

  const fetchPeopleAsync = async () => {
    try {
      const fetchedData = await getPeople();

      setLoading(false);
      setPeople(fetchedData);
    } catch (error) {
      setLoadingError(true);
      throw new Error('There is an error');
    }
  };

  useEffect(() => {
    fetchPeopleAsync();
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
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
              replace
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (
                cn(
                  'navbar-item',
                  {
                    'has-background-grey-lighter': isActive,
                  },
                )
              )}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      {isHomePage && <Navigate to="/" replace />}
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/people"
        >
          <Route
            index
            element={(
              <People
                people={people}
                isLoading={isLoading}
                loadingError={loadingError}
                setSelectedPerson={setSelectedPerson}
                selectedName={selectedName}
                setSelectedName={setSelectedName}
              />
            )}
          />
          <Route
            path={`/people/:${selectedPerson}`}
            element={(
              <People
                people={people}
                isLoading={isLoading}
                loadingError={loadingError}
                setSelectedPerson={setSelectedPerson}
                selectedName={selectedName}
                setSelectedName={setSelectedName}
              />
            )}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

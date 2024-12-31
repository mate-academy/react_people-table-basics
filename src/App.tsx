import { useEffect, useState } from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { People } from './components/People';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import { Person } from './types/Person';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((fetchedPeople) => {
        setPeople(fetchedPeople);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load people.');
        setIsLoading(false);
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
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={
                isLoading ? (
                  <Loader />
                ) : error ? (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                ) : (
                  <People
                    people={people}
                    selectedPerson={selectedPerson}
                    setSelectedPerson={setSelectedPerson}
                  />
                )
              }
            />
            <Route
              path="/people/:slug"
              element={
                isLoading ? (
                  <Loader />
                ) : error ? (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                ) : (
                  <People
                    people={people}
                    selectedPerson={selectedPerson}
                    setSelectedPerson={setSelectedPerson}
                  />
                )
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

import './App.scss';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { getPeople } from './api';
import { Errors } from './types/Errors';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [errorMessage] = useState(Errors.no_errors);
  const hasActiveClass = ({ isActive }: { isActive: boolean }) => (
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    }));

  const fetchData = async () => {
    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch (error) {
      return 'error';
    }

    return 'success';
  };

  setTimeout(() => {
    setIsLoaded(false);
  }, 1000);

  useEffect(() => {
    setIsLoaded(true);
    fetchData();
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
            <NavLink className={hasActiveClass} to="/">
              Home
            </NavLink>

            <NavLink
              onClick={fetchData}
              className={hasActiveClass}
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
            <Route
              path="/people"
              element={(
                <PeoplePage
                  isLoaded={isLoaded}
                  people={people}
                  errorMessage={errorMessage}
                />
              )}
            />
            <Route
              path="*"
              element={<h1 className="title">{Errors.no_page}</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

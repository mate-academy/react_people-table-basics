import './App.scss';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingPeople, setLoadingPeople] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  useEffect(() => {
    setLoadingPeople(true);

    getPeople()
      .then(peopl => {
        const peopleWithParents = peopl.map(person => {
          return {
            ...person,
            mother: peopl.find(p => p.name === person.motherName),
            father: peopl.find(p => p.name === person.fatherName),
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => setError(true))
      .finally(() => setLoadingPeople(false));
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
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={getLinkClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace={true} />} />
            <Route
              path="/people/:personId?"
              element={
                <PeoplePage
                  loadingPeople={loadingPeople}
                  error={error}
                  people={people}
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

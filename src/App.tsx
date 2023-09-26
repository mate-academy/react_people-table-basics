import React, { useEffect, useState } from 'react';
import {
  HashRouter, Route, NavLink,
} from 'react-router-dom';
import './App.scss';
import { Table } from './components/table';
import { getPeople } from './api';
import { Person } from './types';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activePage === 'people') {
      getPeople()
        .then(data => {
          setPeople(data);
          setError(null);
        });
    }

    if (people) {
      setError('could not load data');
    }
  }, [activePage]);

  return (
    <HashRouter>
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
                className={`navbar-item ${activePage === 'home' ? 'has-background-grey-lighter' : ''}`}
                to="/"
                onClick={() => setActivePage('home')}
              >
                Home
              </NavLink>

              <NavLink
                className={`navbar-item ${activePage === 'people' ? 'has-background-grey-lighter' : ''}`}
                to="/people"
                onClick={() => setActivePage('people')}
              >
                People
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            <Route path="/people">
              <div className="block">
                <div className="box table-container">
                  <h1 className="title">People Page</h1>
                  {error ? (
                    <p className="has-text-danger">{error}</p>
                  ) : (
                    <Table people={people} />
                  )}
                </div>
              </div>
            </Route>

            <Route path="/">
              <h1 className="title">Home Page</h1>
            </Route>

            <Route>
              <h1 className="title">Page not found</h1>
            </Route>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

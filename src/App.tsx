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

  useEffect(() => {
    if (activePage === 'people') {
      getPeople()
        .then(data => {
          return setPeople(data);
        });
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
            <Route exact path="/people">
              <div className="block">
                <div className="box table-container">
                  <h1 className="title">People Page</h1>
                  <Table people={people} />
                </div>
              </div>
            </Route>

            <Route exact path="/">
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

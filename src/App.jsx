import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

const App = () => (
  <div className="App">
    <header>
      <h1 className="main-title">People table</h1>

      <nav className="navigation">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink
              to="/"
              exact
              className="nav-link"
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/people"
              className="nav-link"
              activeClassName="active"
            >
              People
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>

    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/people" exact>
        <PeoplePage />
      </Route>

      <Redirect path="/home" to="/" />

      <h2>Page not found</h2>
    </Switch>
  </div>
);

export default App;

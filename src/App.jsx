import React from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

import './App.scss';

// eslint-disable-next-line arrow-body-style
const App = () => {
  // const domain = '/react_people-table-basics/';

  return (
    <div className="App">
      <header className="main-header">
        <NavLink
          to="/"
          exact
          activeClassName="selected"
        >
          Home
        </NavLink>
        <NavLink
          to="/people"
          exact
          activeClassName="selected"
        >
          People
        </NavLink>
      </header>
      <Switch>
        <Route
          path="/"
          exact
          component={HomePage}
        />
        <Route
          path="/people"
          exact
          component={PeoplePage}
        />

        <Redirect
          path="/home"
          to="/"
        />

        <NotFoundPage />
      </Switch>
    </div>
  );
};

export default App;

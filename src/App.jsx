import React from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

import './App.scss';

const App = () => {
  const domain = '/react_people-table-basics';

  return (
    <div className="App">
      <header className="main-header">
        <NavLink
          to={`${domain}/`}
          exact
          activeClassName="selected"
        >
          Home
        </NavLink>
        <NavLink
          to={`${domain}/people`}
          exact
          activeClassName="selected"
        >
          People
        </NavLink>
      </header>
      <Switch>
        <Route
          path={`${domain}/`}
          exact
          component={HomePage}
        />
        <Route
          path={`${domain}/people`}
          exact
          component={PeoplePage}
        />

        <Redirect
          path={`${domain}/home`}
          to={`${domain}/`}
        />

        <NotFoundPage />
      </Switch>
    </div>
  );
};

export default App;

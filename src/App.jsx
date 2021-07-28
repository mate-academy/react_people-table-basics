import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MainNavigation } from './components/MainNavigation';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import 'bulma';
import './App.scss';

const App = () => (
  <>
    <header>
      <MainNavigation />
    </header>

    <section className="section">
      <div className="container">
        <Switch>
          <Route
            // eslint-disable-next-line
            path="https://Artem20201610.github.io/react_people-table-basics/people"
          >
            <PeoplePage />
          </Route>
          <Route
            path="https://Artem20201610.github.io/react_people-table-basics/"
            exact
          >
            <HomePage />
          </Route>

          <Redirect
            // eslint-disable-next-line
            path="https://Artem20201610.github.io/react_people-table-basics/home"
            to="https://Artem20201610.github.io/react_people-table-basics/"
            exact
          />

          <NotFoundPage />
        </Switch>
      </div>
    </section>
  </>
);

export default App;

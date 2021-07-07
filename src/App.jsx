import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';

import './App.scss';

export const App = () => (
  <div className="App">
    <header>
      <nav className="nav">
        <div className="nav__list">
          <Link className="nav__item" to="/home">
            Home
          </Link>
          <Link className="nav__item" to="/people">
            People
          </Link>
        </div>
      </nav>
    </header>
    <section>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people" exact component={PeoplePage} />
        <Redirect path="/home" to="/" />
        <NotFoundPage />
      </Switch>
    </section>
  </div>
);

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
// eslint-disable-next-line import/named
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

const App = () => (
  <>
    <Header />

    <section className="section">
      <div className="columns">
        <div className="column">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/people" component={PeoplePage} />
            <Redirect path="/home" to="/" />

            <p>Not found page</p>
          </Switch>
        </div>
      </div>
    </section>
  </>
);

export default App;

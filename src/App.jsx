import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <>
    <Header />
    <div className="App">
      <h1>People table</h1>
      <div>
        <Switch>
          <Route path="/people" component={PeoplePage} />
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Redirect path="/home" to="/" />
          <NotFoundPage />
        </Switch>
      </div>
    </div>
  </>
);

export default App;

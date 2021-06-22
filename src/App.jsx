import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFountPage';

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

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <>
    <Header />

    <main className="App">
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/people">
          <PeoplePage />
        </Route>

        <Redirect path="/home" to="/" />

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </main>
  </>
);

export default App;

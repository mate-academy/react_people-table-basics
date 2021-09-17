import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route path="/people">
        <PeoplePage />
      </Route>

      <Route path="/" exact>
        <HomePage />
      </Route>

      <Redirect path="/home" to="/" />

      <NotFoundPage />
    </Switch>
  </>
);

export default App;

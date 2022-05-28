import './App.scss';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/people" exact>
          <PeoplePage />
        </Route>

        <Redirect path="/home" to="/" />

        <NotFoundPage />
      </Switch>

    </div>
  );
};

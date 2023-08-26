/* eslint-disable no-nested-ternary */
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { NavBar } from './components/NavBar.tsx';

export const App = () => {
  return (
    <HashRouter>
      <div data-cy="app">
        <NavBar />
        <main className="section">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/home">
                <Redirect to="/" />
              </Route>
              <Route exact path="/people">
                <PeoplePage />
              </Route>
              <Route exact path="/people/:slug">
                <PeoplePage />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </HashRouter>

  );
};

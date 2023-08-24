/* eslint-disable no-nested-ternary */
import {
  HashRouter, Route, NavLink, Switch, Redirect,
} from 'react-router-dom';

import './App.scss';
import { People } from './components/People';

export const App = () => {
  return (
    <HashRouter>
      <div data-cy="app">
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">

              <NavLink
                exact
                to="/"
                className="navbar-item"
                activeClassName="navbar-item has-background-grey-lighter"
              >
                Home
              </NavLink>

              <NavLink
                to="/people"
                className="navbar-item"
                activeClassName="navbar-item has-background-grey-lighter"
              >
                People
              </NavLink>

            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <h1 className="title">Home Page</h1>
              </Route>
              <Route exact path="/home">
                <Redirect to="/" />
              </Route>
              <Route exact path="/people">
                <h1 className="title">People Page</h1>
                <People />
              </Route>
              <Route exact path="/people/:slug">
                <h1 className="title">People Page</h1>
                <People />
              </Route>
              <Route>
                <h1 className="title">Page not found</h1>
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </HashRouter>

  );
};

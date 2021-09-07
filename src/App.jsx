import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App = () => (
  <HashRouter>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/people">
          <PeoplePage />
        </Route>
        <Redirect path="/home" to="/" />
        <NotFoundPage />
      </Switch>
    </div>
  </HashRouter>
);

const Header = () => (
  <nav className="navbar">
    <div>
      <div className="navbar-item">
        <NavLink className="navbar-link" to="/" exact>
          HomePage
        </NavLink>
      </div>
      <div className="navbar-item">
        <NavLink className="navbar-link" to="/people">
          PeoplePage
        </NavLink>
      </div>
    </div>
  </nav>
);

export default App;

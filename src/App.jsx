import React from 'react';
import {
  BrowserRouter as Router,
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
  <Router basename="/react_people-table-basics">
    <div className="App">
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
    </div>
  </Router>
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

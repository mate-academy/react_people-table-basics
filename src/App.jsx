import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFounPage/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <header>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/people">People</Link>
          </li>
        </ul>
      </nav>
    </header>
    <Switch>
      <Route path="/people">
        <PeoplePage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;

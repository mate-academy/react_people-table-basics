import React from 'react';
import {
  Switch, Route,
  Redirect, Link,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="App">
    <header className="header">
      <h1>header</h1>
      <Link to="/" className="link">To home page</Link>
      <Link to="/people" className="link">To people table</Link>
    </header>
    <Switch>

      <Route path="/home">
        <h1>Home page</h1>
      </Route>

      <Route path="/people">
        <h1>People table</h1>
        <PeoplePage />
      </Route>
      <Redirect path="/" to="/home" exact />

      <h1>Page not found</h1>
    </Switch>
  </div>
);

export default App;

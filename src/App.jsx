import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="App">
    <nav>
      <Link to="/">Home</Link>
      {' '}
      <Link to="/people">People</Link>
    </nav>

    <Switch>
      <Route path="/people">
        <PeoplePage />
      </Route>

      <Route path="/" exact>
        <HomePage />
      </Route>

      <Redirect path="/home" to="/" />

      <h1>Page not found</h1>
    </Switch>
  </div>
);

export default App;

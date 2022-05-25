import './App.scss';
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Nav from './components/nav/nav';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

const App: React.FC = () => (
  <div className="app">
    <Nav />

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />
      <Redirect path="/home" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;

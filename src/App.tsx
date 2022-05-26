import React from 'react';
import './App.scss';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Navigation } from './components/Navigation/Navigation';

const App: React.FC = () => (
  <div className="App">
    <Navigation />

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />
      <Redirect path="/home" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;

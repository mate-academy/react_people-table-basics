import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/people" component={PeoplePage} />

      <Route path="/home" component={HomePage} />

      <NotFoundPage />
    </Switch>
  </div>
);

export default App;

import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import './App.scss';

const App: React.FC<{}> = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route
        path='/'
        component={HomePage}
        exact
      />

      <Route
        path='/people'
        component={PeoplePage}
      />

      <Redirect path='/home' to='/' />

      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;

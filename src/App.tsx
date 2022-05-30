import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { MainNavigation } from './components/MainNavigation/MainNavigation';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

import './App.scss';
import 'bulma';

const App: React.FC = () => {
  return (
    <>
      <MainNavigation />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people" component={PeoplePage} />
        <Redirect to="/" from="/home" />
        <PageNotFound />
      </Switch>
    </>
  );
};

export default App;

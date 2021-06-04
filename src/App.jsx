import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import 'bulma';
import { Header } from './Header/Header';
import { HomePage } from './HomePage/HomePage';
import { PeoplePage } from './PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App = () => (
  <>
    <Header />
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/people" component={PeoplePage} />
        <Redirect path="/home" to="/" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </>
);

export default App;

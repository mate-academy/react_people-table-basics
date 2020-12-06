import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/HomePage';
import NotFound from './components/NotFound';
import People from './components/PeoplePage';

import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <h1>People table</h1>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/people"  exact component={People} />
      <Redirect path="home" to="/" />
      <NotFound />
    </Switch>
  </div>
);

export default App;

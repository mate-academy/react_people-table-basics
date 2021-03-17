import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bulma';

import { getPeople } from './api/peoples';
import './App.scss';
import { PeopleTable } from './components/PeopleTable';
import { MainNavigation } from './components/MainNavigation';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div className="App">
      <MainNavigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/people">
          <PeopleTable people={people} />
        </Route>

        <Redirect path="/home" to="/" />

        <NotFoundPage />
      </Switch>
    </div>
  );
};

export default App;

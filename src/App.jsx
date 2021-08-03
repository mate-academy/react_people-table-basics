import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import { HomePage } from './components/HomePage/Home';
import { PeoplePage } from './components/PeoplePage/People';
import { getPeople } from './people/people';

import './App.scss';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route
          path="/"
          exact
        >
          <HomePage />
        </Route>

        <Route path="/people">
          <PeoplePage people={people} />
        </Route>

        <Redirect path="/home" to="/" />

        <h2>
          Page not found
        </h2>
      </Switch>
    </>
  );
};

export default App;

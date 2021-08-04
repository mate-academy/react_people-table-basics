import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import { HomePage } from './components/HomePage/Home';
import { PeoplePage } from './components/PeoplePage/People';
import { getPeople } from './people/people';
import WrongPage from './components/NotFoundPage/NotFoundPage';

import './App.scss';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
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

        <Route component={ WrongPage }></Route>
      </Switch>
    </>
  );
};

export default App;

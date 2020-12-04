import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './App.scss';
import { HomePage } from './components/HomePage';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { getPeople } from './api/people';

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const requestedPeople = await getPeople();
      const peopleWithIds = requestedPeople.map(person => (
        {
          ...person,
          id: uuidv4(),
        }
      ));

      setPeople(peopleWithIds);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <div className="container">
        <h1 className="title">People table</h1>
        <div className="container">
          <Switch>
            <Route path="/people">
              <PeoplePage people={people} />
            </Route>

            <Route path="/" exact>
              <HomePage />
            </Route>

            <Redirect path="/home" to="/" />

            <NotFoundPage />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

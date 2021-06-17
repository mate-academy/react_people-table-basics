import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import { PeopleTable } from './PeopleTable';

import './App.scss';

const App = () => {
  const [peoples, setPeople] = useState([]);

  const getPeople = () => {
    fetch("https://mate-academy.github.io/react_people-table/api/people.json")
      .then(response => response.json())
      .then(people => setPeople(people))
  };

  return (
    <>
      <header>
        <nav className="nav">
          <Link
            className="nav__link"
            to="/"
          >
            <h2 className="nav__title">Home page</h2>
          </Link>
          <Link
            className="nav__link"
            to="/people"
            onClick={getPeople()}
          >
            <h2 className="nav__title">People page</h2>
          </Link>
        </nav>
      </header>

      <main>
        <div className="main">
          <Switch>
          <Route path="/people">
            <PeopleTable peoples={peoples}/>
          </Route>

          <Route path="/" exact>
            <h1 className="main__title">Home page</h1>
          </Route>

          <Redirect path="/home" to="/"></Redirect>

          <h1>Page not found</h1>
          </Switch>
        </div>
      </main>
    </>
  );
};

export default App;

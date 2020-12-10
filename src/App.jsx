import React, { useState, useEffect } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import { Peoplepage } from './components/Peoplepage';
import { getPeople } from './api/API';

import './App.scss';

const App = () => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      setPeople(await getPeople());
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <nav className="navigation">
        <Link className="navigation__link" to="/">Home</Link>
        <Link className="navigation__link" to="/people">People</Link>
      </nav>

      <section>
        <div>
          <h1>Header</h1>
        </div>
      </section>

      <Switch>
        <Route path="/" component={Homepage} exact />

        <Route path="/people">
          <Peoplepage people={people} />
        </Route>

        <Redirect path="/home" to="/" />

        <p>Not found page!</p>
      </Switch>
    </div>
  );
};

export default App;

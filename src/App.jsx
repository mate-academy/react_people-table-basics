import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
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
    <div className="app section">
      <div className="tabs">
        <ul>
          <li>
            <NavLink to="/" activeClassName="is-active" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/people" activeClassName="is-active" exact>
              People
            </NavLink>
          </li>
        </ul>
      </div>

      <section>
        <div>
          <h1 className="title is-2">Welcome</h1>
        </div>
      </section>

      <Switch>
        <Route path="/" component={Homepage} exact />

        <Route path="/people">
          <Peoplepage people={people} />
        </Route>

        <Redirect path="/home" to="/" />

        <p className="paragraph">Not found page!</p>
      </Switch>
    </div>
  );
};

export default App;

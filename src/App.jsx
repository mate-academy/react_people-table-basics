import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from './Header';
import { HomePage } from './HomePage';
import { PeopleTable } from './PeopleTable';

import './App.scss';

const App = () => {
  return (
    <>
      <Header />

      <main>
        <div className="main">
          <Switch>
            <Route path="/people" component={PeopleTable} />
            <Route path="/" exact component={HomePage} />

            <Redirect path="/home" to="/"></Redirect>
            <Redirect path="/peoples" to="/people"></Redirect>

            <h1>Page not found</h1>
          </Switch>
        </div>
      </main>
    </>
  );
};

export default App;

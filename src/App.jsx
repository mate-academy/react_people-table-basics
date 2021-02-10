import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

const App = () => (
  <div className="App">
    <header>
      <NavBar />
    </header>

    <main className="page">
      <div className="container">
        <Switch>
          <Route path="/people" component={PeoplePage} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/" path="/home" />
          <NotFoundPage />
        </Switch>
      </div>
    </main>
  </div>
);

export default App;

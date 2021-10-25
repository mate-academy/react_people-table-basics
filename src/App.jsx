import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Header } from './Components/Header';
import { NotFoundPage } from './Components/NotFoundPage';
import { HomePage } from './Components/HomePage';
import { PeoplePage } from './Components/PeoplePage';

import './App.scss';

const App = () => {

  return(
    <div className="App">
      <Header/>

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/people">
          <PeoplePage />
        </Route>

        <NotFoundPage/>
      </Switch>
    </div>
)};

export default App;

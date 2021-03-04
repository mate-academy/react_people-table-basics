import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';
import 'bulma';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App: React.FC = () => {

  return (
    <div className="App">
      <Header />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Switch>
                <Route path='/' exact component={HomePage}></Route>
                <Route path='/people' component={PeoplePage}></Route>
                <Redirect path='/home' to='/' />
                <p><NotFoundPage /></p>
              </Switch>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default App;

import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';

import 'bootstrap/dist/css/bootstrap.min.css';


import './App.scss';

const App: React.FC = () => {
  return (
      <div>
        <Header />
        
        <hr />

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/people">
            <PeoplePage />
          </Route>
          <NotFoundPage />
          <Redirect path="/home" to="/"  /> 
        </Switch>
      </div>
  );
}

export default App;

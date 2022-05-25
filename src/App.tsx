import './App.scss';

import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Header } from './Components/Header/Header';
import { HomePage } from './Components/HomePage/HomePage';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';
import { NotFoundPage } from './Components/NotFoundPage/NotFoundPage';

export const App = () => (
  <div className="App">
    <Header />

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" exact component={PeoplePage} />
      <NotFoundPage />
      <Redirect path="/home" to="/" />
    </Switch>
  </div>
);

import './App.scss';
import { Route, Redirect, Switch } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';

export const App = () => (
  <div className="App">
    <Header />

    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/people" exact>
        <PeoplePage />
      </Route>

      <Redirect path="/home" to="/" />

      <NotFoundPage />
    </Switch>
  </div>
);

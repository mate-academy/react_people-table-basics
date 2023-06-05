import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/Home';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home">
              <Redirect to="/" />
            </Route>
            <Route exact path="/people" component={PeoplePage} />
            <Route exact path="/people/:slug" component={PeoplePage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
};

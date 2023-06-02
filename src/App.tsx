import {
  Route, Switch, Redirect,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './HomePage';
import { PeoplePage } from './components/PeoplePages/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/home">
            <Redirect to="/" />
          </Route>
          <Route path="/people" component={PeoplePage} />
          <Route path="/:selectedSlug" component={PeoplePage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>

      </div>
    </main>
  </div>
);

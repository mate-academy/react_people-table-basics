import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { MainNavigation } from './components/MainNavigation/MainNavigation';

const App = () => (
  <div className="App">
    <MainNavigation />

    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/people" exact>
        <PeoplePage />
      </Route>

      <Redirect path="/home" to="/" />

      <Route path="/">
        <NotFoundPage />
      </Route>
    </Switch>
  </div>
);

export default App;

import {
  Route,
  Switch,
  Redirect,
  NavLink,
} from 'react-router-dom';
import './App.scss';
import { HomePage } from './Components/HomePage/HomePage';
import { NotFoundPage } from './Components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';

const App = () => (
  <div className="app">
    <nav className="app__nav">
      <NavLink
        exact
        to="/"
        className="app__nav--item"
      >
        Home page
      </NavLink>
      <NavLink
        to="/people"
        className="app__nav--item"
      >
        People page
      </NavLink>
    </nav>

    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />
      <Redirect path="/home" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;

import './App.scss';
import {
  Link, Redirect, Route, Switch,
} from 'react-router-dom';
import { HomePage } from './Components/HomePage/HomePage';
import { PeoplePage } from './Components/PeoplePage/PeoplePage';
import { NotFoundPage } from './Components/NotFoundPage/NotFoundPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Link to="/" className="nav-link">
        Home Page
      </Link>

      <Link to="/peoples" className="nav-link">
        Peoples
      </Link>

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/peoples" component={PeoplePage} />
        <Redirect path="/home" to="/" />
        <NotFoundPage />
      </Switch>
    </div>

  );
};

export default App;

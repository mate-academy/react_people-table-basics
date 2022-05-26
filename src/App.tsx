import './App.scss';
import {
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav__link">
          Home
        </Link>
        <Link to="/people" className="nav__link">
          People
        </Link>
      </nav>
    </header>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />
      <Redirect path="/home" to="/" />
      <h1>Not found page</h1>
    </Switch>
  </div>
);

export default App;

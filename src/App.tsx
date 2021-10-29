import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage/index';
import { PeoplePage } from './components/PeoplePage/index';
import { NotFoundPage } from './components/NotFoundPage/index';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route
        path="/"
        exact
      >
        <HomePage />
      </Route>
      <Route
        path="/people"
        exact
      >
        <PeoplePage />
      </Route>

      <Redirect
        path="/home"
        to="/"
      />

      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  </div>
);

export default App;

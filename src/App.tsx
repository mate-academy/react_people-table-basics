import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/people" component={PeoplePage} />
      <Redirect path="/home" to="/" />
      <NotFoundPage />
    </Switch>
  </div>
);

export default App;

import './App.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

const App = () => (
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

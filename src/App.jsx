/* eslint-disable react/jsx-filename-extension */
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/people">
          <PeoplePage />
        </Route>
        <Redirect path="/home" to="/" />
        <h1 className="title">Page Not Found</h1>
      </Switch>
    </>
  );
};

export default App;

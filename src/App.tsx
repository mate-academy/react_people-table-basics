import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { MainRouter } from './components/MainRouter/MainRouter';

export const App = () => (
  <div data-cy="app">
    <Navigation />
    <MainRouter />
  </div>
);

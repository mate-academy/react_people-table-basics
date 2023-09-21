import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Navigation />
    <HomePage />
    <PeoplePage />
    <NotFoundPage />
  </div>
);

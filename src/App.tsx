import './App.scss';
import { Outlet } from 'react-router-dom';
// import { HomePage } from './components/pages/HomePage';
// import { PeoplePage } from './components/pages/PeoplePage';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

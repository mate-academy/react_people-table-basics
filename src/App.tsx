import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => (
  <div data-cy="app">

    <Navigation />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

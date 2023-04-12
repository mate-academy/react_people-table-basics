import { Outlet } from 'react-router-dom';
import './App.scss';

import { MainNav } from './components/MainNav';

export const App = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

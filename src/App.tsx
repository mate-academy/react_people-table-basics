import { Outlet } from 'react-router-dom';

import { Nav } from './components/Nav/Nav';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Nav />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

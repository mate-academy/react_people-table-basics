import { Outlet } from 'react-router-dom';
import { Navigate } from './components/Nav';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigate />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

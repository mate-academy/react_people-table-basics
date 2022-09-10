import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigate } from './components/Navigate/Navigate';

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

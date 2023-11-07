import { Outlet } from 'react-router-dom';
import './App.scss';
import { NavPage } from './Pages/NavPage';

export const App = () => (
  <div data-cy="app">
    <NavPage />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

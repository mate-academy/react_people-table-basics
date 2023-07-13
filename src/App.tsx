import { Outlet } from 'react-router-dom';
import './App.scss';
import { MainNavigation } from './components/MainNavigation';

export const App = () => (
  <div data-cy="app">
    <MainNavigation />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

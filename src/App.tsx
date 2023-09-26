import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from './pages/NavigationBar';

export const App = () => (
  <div data-cy="app">
    <NavigationBar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

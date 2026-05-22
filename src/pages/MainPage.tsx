import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export const MainPage = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

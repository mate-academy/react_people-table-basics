import { Outlet } from 'react-router-dom';
import './App.scss';
import { PageNavigation } from './components/PageNavigation/PageNavigation';

export const App = () => (
  <div data-cy="app">
    <PageNavigation />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

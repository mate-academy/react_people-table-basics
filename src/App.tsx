import { Outlet } from 'react-router-dom';
import { PageNav } from './components/PageNav';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <PageNav />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Outlet />

        <div className="block" />
      </div>
    </main>
  </div>
);

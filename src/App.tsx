import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

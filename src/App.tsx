import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <Navbar />

      <Outlet />
    </main>
  </div>
);

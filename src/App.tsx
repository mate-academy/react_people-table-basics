import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <Outlet />
    </main>
  </div>
);

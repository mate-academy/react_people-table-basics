import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

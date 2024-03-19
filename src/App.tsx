import { Outlet } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/NavBar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};

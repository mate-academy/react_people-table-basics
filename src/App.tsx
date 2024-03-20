import { NaviBar } from './components/NaviBar';
import { Outlet } from 'react-router-dom';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <NaviBar />

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};

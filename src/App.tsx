import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navibar } from './components/Navibar/Navibar';

export const App = () => (
  <div data-cy="app">
    <Navibar />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

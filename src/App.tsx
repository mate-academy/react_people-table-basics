import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Navbar />
        <div className="block">
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);

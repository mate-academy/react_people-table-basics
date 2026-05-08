import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      {/* Why does this container div change when switching between pages? */}
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

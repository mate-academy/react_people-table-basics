import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

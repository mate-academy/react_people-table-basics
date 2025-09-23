import './App.scss';
import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';

document.documentElement.classList.add('has-navbar-fixed-top');

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

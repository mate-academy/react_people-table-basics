import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Navbar />
      </div>
    </nav>

    <main className="section" style={{ marginTop: '60px' }}>
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

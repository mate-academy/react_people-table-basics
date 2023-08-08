import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Navigation />
      </div>
    </nav>

    <Outlet />
  </div>
);

import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/Nav/Navbar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
);

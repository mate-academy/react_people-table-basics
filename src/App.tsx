import { Outlet } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <Outlet />
  </div>
);

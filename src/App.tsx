import { Outlet } from 'react-router-dom';
import './App.scss';
import { Nav } from './components/Nav';

export const App = () => (
  <div data-cy="app">
    <Nav />
    <Outlet />
  </div>
);

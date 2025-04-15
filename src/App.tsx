import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <Outlet />
    </div>
  );
};

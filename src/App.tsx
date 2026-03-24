import './App.scss';
import { NavBar } from './components/NavBar';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <div data-cy="app">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar';

export const HomePage = () => (

  <div data-cy="app">
    <NavBar />

    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
);

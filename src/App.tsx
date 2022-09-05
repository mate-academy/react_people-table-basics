import { Outlet } from 'react-router-dom';
// import { Loader } from './components/Loader';
import { NavBar } from './components/NavBar';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

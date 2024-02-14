import { Outlet } from 'react-router-dom';
// import { Loader } from './components/Loader';

import './App.scss';
import { Nav } from './components/Nav/Nav';

export const App = () => (
  <div data-cy="app">
    <Nav />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

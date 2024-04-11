import './App.scss';
import { Outlet } from 'react-router-dom';

import { NavMenu } from './components/NavMenu/NavMenu';

export const App = () => {
  return (
    <div data-cy="app">
      <NavMenu />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavPage } from './Pages/NavPage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavPage />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

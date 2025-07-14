import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';

export const App = () => (
  <>
    <NavBar />
    <div data-cy="app">
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  </>
);

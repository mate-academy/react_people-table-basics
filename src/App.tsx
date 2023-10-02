import { Outlet } from 'react-router-dom';
import './App.scss';
import { Nav } from './components/Nav';

export const App = () => {
  return (
    <div data-cy="app">
      <Nav />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

import { NavBar } from './components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

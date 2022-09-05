import { Outlet } from 'react-router-dom';
// import { Loader } from './components/Loader';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

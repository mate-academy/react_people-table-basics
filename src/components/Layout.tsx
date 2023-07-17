import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

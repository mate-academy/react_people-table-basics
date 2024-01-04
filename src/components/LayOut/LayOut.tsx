import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';

export const Layout = () => (
  <div>
    <Navigation />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

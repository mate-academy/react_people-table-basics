import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Layout: React.FC = () => (
  <div data-cy="app">
    <Header />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

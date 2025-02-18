import './App.scss';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === '/home') {
    return <Navigate to="/" replace />;
  }

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

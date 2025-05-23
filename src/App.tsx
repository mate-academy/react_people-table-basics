import './App.scss';
import { NavBar } from './components/Header/NavBar';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/home') {
      navigate('/', { replace: true });
    }
  }, [location]);

  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

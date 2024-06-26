import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';

import './App.scss';
import { useContext, useEffect } from 'react';
import { PeopleContext } from './peopleContext';

export const App = () => {
  const { setCurrentPage } = useContext(PeopleContext);
  const detect = useLocation().pathname;

  useEffect(() => {
    setCurrentPage(detect);
  }, [detect]);

  if (detect === '/home') {
    return <Navigate to="/" />;
  }

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};

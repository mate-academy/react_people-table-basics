import { Outlet } from 'react-router-dom';

import './App.scss';
import { PageNavigation } from './components/Navigation/Navigation';

export const App = () => {
  return (
    <div data-cy="app">
      <PageNavigation />
      <div className="container">
        <main className="section">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

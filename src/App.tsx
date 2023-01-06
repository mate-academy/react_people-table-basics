import { Outlet } from 'react-router-dom';
import { MainNav } from './components/MainNav';
// import { PageNavLink } from './components/PageNavLink';
// import { PeoplePage } from './components/PeoplePage';
// import { Loader } from './components/Loader';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

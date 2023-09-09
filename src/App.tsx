import { Outlet } from 'react-router-dom';

import './App.scss';
import { MainNavigation } from './components/MainNavigation';

export const App = () => (
  <div data-cy="app">
    <MainNavigation />
    <Outlet />
  </div>
);

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

export const App: FC = () => (
  <div data-cy="app">
    <Navigation />
    <Outlet />
  </div>
);

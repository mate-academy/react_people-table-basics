import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <Outlet />
  </div>
);
// function classNames(arg0: string, arg1: { 'is-active': boolean; }) {
//   throw new Error('Function not implemented.');
// }

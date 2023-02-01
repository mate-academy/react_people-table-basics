import './App.scss';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';

export const App: FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};

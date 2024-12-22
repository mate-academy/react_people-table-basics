import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div data-cy="app">
    <Header />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

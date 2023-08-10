import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';

export const App: React.FC = () => (
  <div data-cy="app">
    <main className="section">
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </main>
  </div>
);

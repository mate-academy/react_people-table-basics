import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';

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

import './App.scss';

import { Navbar } from './components/Navbar';
import { MainRoutes } from './Routes';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <MainRoutes />
      </div>
    </main>
  </div>
);

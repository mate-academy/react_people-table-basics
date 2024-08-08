import { Navbar } from './components/Navbar';
import './App.scss';
import { AppRoutes } from './AppRoutes';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <AppRoutes />
      </div>
    </main>
  </div>
);

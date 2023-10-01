import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AppProvider } from './components/Context/AppProvider';

export const App = () => (
  <div data-cy="app">
    <AppProvider>
      <Navigation />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </AppProvider>
  </div>
);

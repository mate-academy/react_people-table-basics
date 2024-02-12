import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { AppRoutes } from './components/AppRoutes';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />
      <main className="section">
        <div className="container">
          <AppRoutes />
        </div>
      </main>
    </div>
  );
};

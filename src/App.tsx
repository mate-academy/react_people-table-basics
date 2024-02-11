import './App.scss';
import { AppRoutes } from './components/AppRoutes/AppRoutes';
import { Navigation } from './components/Navigation/Navigation';

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

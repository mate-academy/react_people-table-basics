import { AppRouter } from './Router';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <AppRouter />
    </main>
  </div>
);

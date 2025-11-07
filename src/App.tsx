import { Router } from './Router';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <Router />
    </main>
  </div>
);

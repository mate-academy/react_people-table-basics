import './App.scss';
import { NavBar } from './components/NavBar/NavBar';
import { Router } from './components/router/router';

export const App = () => (
  <>
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Router />
        </div>
      </main>
    </div>
  </>
);

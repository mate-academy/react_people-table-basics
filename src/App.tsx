import { Router } from './Router';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <div className="section">
      <div className="container">
        <Router />
      </div>
    </div>
  </div>
);

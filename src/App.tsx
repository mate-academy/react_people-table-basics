import './App.scss';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <h1 className="title">Home Page</h1>
        <h1 className="title">Page not found</h1>
      </div>
    </main>
  </div>
);

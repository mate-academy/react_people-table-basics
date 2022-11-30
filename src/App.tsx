import './App.scss';
import { NavBar } from './components/NavBar';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavBar />
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <PeoplePage />
      </div>
    </main >
  </div >
);

import './App.scss';
import { NavigationLink } from './components/NavigationLink/NavigationLink';
import { Pages } from './pages/Pages';

export const App = () => {
  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavigationLink to="/" name="Home" />
            <NavigationLink to="/people" name="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Pages />
        </div>
      </main>
    </div>
  );
};

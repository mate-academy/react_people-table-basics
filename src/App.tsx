import './App.scss';
import { Outlet } from 'react-router-dom';
import { PersonLinks } from './components/PersonLinks';

// не має помилки про посилку з сервером, лажа з стилями, заголовки таблиць

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
          <PersonLinks to="/" text="Home" />
          <PersonLinks to="/people" text="People" />
        </div>
      </div>
    </nav>

    <Outlet />
  </div>
);

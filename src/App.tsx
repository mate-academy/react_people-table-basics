import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { NavigationLink } from './components/NavigationLink';

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
          <NavigationLink to="/" text="Home" />
          <NavigationLink to="/people" text="People" />
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<h1 className="title">Home Page</h1>} />

          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);

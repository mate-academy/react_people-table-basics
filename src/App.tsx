import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { People } from './pages/People';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { PageNavLink } from './components/PageNavLink';

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
            <PageNavLink path="/" text="Home" className="navbar-item" />
            <PageNavLink path="/people" text="People" className="navbar-item" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/people">
              <Route index element={<People />} />
              <Route path=":slug" element={<People />} />
            </Route>
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>

        </div>
      </main>
    </div>
  );
};

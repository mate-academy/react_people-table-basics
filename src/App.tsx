import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { Home } from './components/Home';
import { NotFoundPage } from './components/NotFoundPage';
import { People } from './components/People';

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
}

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
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/people" className={getNavLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="people">
          <Route path=":selectedPersonSlug?" element={<People />} />
        </Route>
      </Routes>
    </main>
  </div>
);

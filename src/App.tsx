import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { HomePage } from './components/HomePage/HomePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="people" element={<PeoplePage />}>
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);

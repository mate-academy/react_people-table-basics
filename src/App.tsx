
import classNames from 'classnames';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/Loader/HomePage/HomePage';
import { PeoplePage } from './components/Loader/PeoplePage/PeoplePage';



const activeLink = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
            <NavLink className={activeLink} to="/">
              Home
            </NavLink>

            <NavLink
              className={activeLink}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
               <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<h1 className="title">Page not found</h1>} />
          </Routes>

        </div>
      </main>
    </div>
  );
}

import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import classNames from 'classnames';

export const App = () => {
  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

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
            <NavLink className={getActiveClass} to="/">
              Home
            </NavLink>

            <NavLink className={getActiveClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          {
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/people">
                <Route path=":personSlug?" element={<PeoplePage />} />
              </Route>
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Routes>
          }
        </div>
      </main>
    </div>
  );
};

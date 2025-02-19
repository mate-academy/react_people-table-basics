import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleList } from './components/Loader/PeopleList/PeopleList';

export const App = () => {
  const navigationClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

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
            <NavLink className={navigationClass} to="/">
              Home
            </NavLink>

            <NavLink className={navigationClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={
                <>
                  <h1 className="title">People Page</h1>
                  <PeopleList />
                </>
              }
            />
            <Route
              path="/people/:personId"
              element={
                <>
                  <h1 className="title">People Page</h1>
                  <PeopleList />
                </>
              }
            />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

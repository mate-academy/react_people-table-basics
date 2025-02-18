import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';
import { Home } from './pages/Home';
import { People } from './pages/People';
import classNames from 'classnames';

export const App = () => {
  const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
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
            <NavLink className={getLinkClasses} to={'/'}>
              Home
            </NavLink>

            <NavLink className={getLinkClasses} to={'/people'}>
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path={'*'} element={<PageNotFound />}></Route>
            <Route path={'home'} element={<Navigate to={'/'} replace />} />
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'people'} element={<People />}>
              <Route path={':slug'} element={<People />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

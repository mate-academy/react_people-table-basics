import { Outlet, NavLink, useParams, Navigate } from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const App = () => {
  const params = useParams();

  return (
    <>
      <div data-cy="app">
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <NavLink className={getLinkClass} to="/">
                Home
              </NavLink>

              <NavLink className={getLinkClass} to="/people">
                People
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="section">
          <div className="container">
            <div className="block">
              {params['*'] === 'home' && <Navigate to=".." replace={true} />}
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

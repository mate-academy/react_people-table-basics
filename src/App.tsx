import { NavLink, Outlet } from 'react-router-dom';

import './App.scss';
import classNames from 'classnames';

export const App = () => {
  // const Navigate = useNavigate();

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
            <ul className="navbar-brand">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames('navbar-item', {
                      'has-background-grey-lighter': isActive,
                    })
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/people"
                  className={({ isActive }) =>
                    classNames('navbar-item', {
                      'has-background-grey-lighter': isActive,
                    })
                  }
                >
                  People
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

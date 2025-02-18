import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import classNames from 'classnames';

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
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              classNames("navbar-item", {'has-background-grey-lighter': isActive})
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              classNames("navbar-item", {'has-background-grey-lighter': isActive})
            }
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
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<Navigate to="/" replace />} />
          <Route path='/people' element={<PeoplePage />}>
          <Route index element={<PeoplePage />} />
          <Route path=':humanId' element={<PeoplePage />} />
          </Route>
          <Route path='*' element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);

import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import { NotFoundPage } from './components/NotFoundPage.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/extensions
import { PeoplePage } from './components/PeoplePage.tsx';

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
            to="/"
            className={({ isActive }) =>
              classNames('navbar-item', {
                'has-background-grey-lighter': isActive,
              })
            }
          >
            Home
          </NavLink>

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
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="/home" element={<Navigate to="/" replace={true} />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

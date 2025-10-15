import './App.scss';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import PeoplePage from './PeoplePage';
import PageNotFound from './PageNotFound';
import classNames from 'classnames';

export const App = () => {
  const currentLocation = useLocation();
  // const navigate = useNavigate();
  // if (currentLocation.pathname === '/home') {
  //   navigate('/', { replace: true });
  // }

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
            <a
              className={classNames('navbar-item', {
                'has-background-grey-lighter': currentLocation.pathname === '/',
              })}
              href="#/"
            >
              Home
            </a>

            <a
              className={classNames('navbar-item', {
                'has-background-grey-lighter':
                  currentLocation.pathname.startsWith('/people'),
              })}
              href="#/people"
            >
              People
            </a>
          </div>
        </div>
      </nav>

      <div className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};

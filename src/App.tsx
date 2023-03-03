import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
// import { Loader } from './components/Loader';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './components/PageNotFound';
import { PersonPage } from './components/PersonPage';

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
          <Navbar />
        </div>
      </nav>

      <main className="section">

        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<PageNotFound />}
            />
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route path="people">
              <Route
                index
                element={<PersonPage />}
              />
              <Route
                path=":slug"
                element={<PersonPage />}
              />
            </Route>
            <Route
              path="people/:slug"
              element={<PersonPage />}
            />

          </Routes>
        </div>
      </main>
    </div>
  );
};

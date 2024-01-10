import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import {Navigation} from "./components/Navigation/Navigation";

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
          <Navigation />
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
              path="home"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route path="people">
              <Route
                index
                element={<PeoplePage />}
              />

              <Route
                path=":personSlug"
                element={<PeoplePage />}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

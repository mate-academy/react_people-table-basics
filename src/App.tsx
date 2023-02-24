import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
// import { Loader } from './components/Loader';
import './App.scss';
import { Navbar } from './components/Navbar';
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
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
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

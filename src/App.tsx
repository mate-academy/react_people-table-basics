import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { TodoPage } from './components/TodoPage';
import { PageNavLink } from './components/PageNavLink';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

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
          <div className="navbar-brand">
            <PageNavLink
              to="/"
              text="Home"
              end
            />
            <PageNavLink
              to="/people"
              text="People"
            />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage/>}
            >
              <Route
                path="home"
                element={<Navigate to="/" replace />}
              />
            </Route>

            <Route path="/people">
              <Route index element={<TodoPage/>}/>
              <Route
                path=":slug"
                element={<TodoPage />}/>
            </Route>

            <Route
              path="*"
              element={<NotFoundPage/>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

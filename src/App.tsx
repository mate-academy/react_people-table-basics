import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { PepoplePage } from './pages/PepoplePage';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />
        <Route path="/people">
          <Route
            index
            element={<PepoplePage />}
          />
          <Route
            path=":personSlug"
            element={<PepoplePage />}
          />
        </Route>

        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Routes>
    </main>
  </div>
);

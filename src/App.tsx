import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { MainNav } from './components/MainNavigation';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <MainNav />
    <main className="section">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="home"
          element={<Navigate to="/" replace />}
        />
        <Route
          path="/people"
          element={<PeoplePage />}
        >
          <Route
            path=":slug"
            element={<PeoplePage />}
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

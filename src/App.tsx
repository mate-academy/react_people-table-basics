import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage';
import { People } from './components/People';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage />
          )}
        />

        <Route
          path="/home"
          element={(
            <Navigate to="/" />
          )}
        />

        <Route
          path="/people"
          element={(
            <People />
          )}
        />

        <Route
          path="/people/:personSlug"
          element={(
            <People />
          )}
        />

        <Route
          path="*"
          element={(
            <NotFoundPage />
          )}
        />

      </Routes>
    </main>
  </div>
);

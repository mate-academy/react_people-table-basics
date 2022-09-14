import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />
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

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { NavBar } from './components/NavBar';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route
              index
              element={<PeoplePage />}
            />
            <Route
              path="/people/:personSlug"
              element={<PeoplePage />}
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);

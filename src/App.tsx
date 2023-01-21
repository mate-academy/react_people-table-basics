import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={(<PeoplePage />)} />
            <Route path=":slug" element={(<PeoplePage />)} />
          </Route>

        </Routes>

      </div>
    </main>
  </div>
);

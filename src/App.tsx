import './App.scss';
import { Outlet, Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        <div data-cy="app">
          <NavBar />
          <main className="section">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </div>
      }
    >
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people" element={<PeoplePage />}>
        <Route path=":personSlug" />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

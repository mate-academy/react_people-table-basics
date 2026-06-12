import './App.scss';
import { NotFoundPage } from './components/Page/NotFoundPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/Page/HomePage';
import { PeoplePage } from './components/Page/PeoplePage';
import { useEffect } from 'react';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('has-navbar-fixed-top');
  }, []);

  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />

            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

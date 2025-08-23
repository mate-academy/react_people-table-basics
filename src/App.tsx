import './App.scss';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';
import { useEffect } from 'react';
import NavBar from './components/NavBar';

export const App = () => {
  // цього класу не вистача шоб виглядало як на референсі.
  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.classList.add('has-navbar-fixed-top');

    return () => {
      htmlElement.classList.remove('has-navbar-fixed-top');
    };
  }, []);

  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

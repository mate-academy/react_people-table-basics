import { Loader } from './components/Loader';

import './App.scss';

import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/Loader/HomePage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { NotFoundPage } from './components/Loader/NotFoundPage';
import { Navbar } from './components/Loader/Navbar';

import { useParams, useLocation } from 'react-router-dom'

export const App = () => {
  const { pathname } = useLocation();

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:personSlug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

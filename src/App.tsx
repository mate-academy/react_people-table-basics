import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Loader/Navbar';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PoplePage';
import { PersonPage } from './pages/PersonPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PersonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

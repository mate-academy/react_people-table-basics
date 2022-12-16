import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
      </Routes>
    </main>
  </div>
);

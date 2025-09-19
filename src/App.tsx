import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="/home" element={<Navigate to="/" replace />}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

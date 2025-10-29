import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
// eslint-disable-next-line import/extensions
import { HomePage } from './pages/HomePage/HomePage';
// eslint-disable-next-line import/extensions
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
// eslint-disable-next-line import/extensions
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => (
  <HashRouter>
    <Navbar />

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
  </HashRouter>
);

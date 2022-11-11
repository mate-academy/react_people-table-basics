import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">

        <div className="block">
          <Routes>
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="//home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </main>
  </div>
);

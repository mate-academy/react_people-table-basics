import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navbar/Navbar';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { NotFoundPage } from './components/pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

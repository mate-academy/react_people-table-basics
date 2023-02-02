import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { PeoplePage } from './Pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

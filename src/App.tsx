import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LayoutRouter } from './components/LayoutRouter';
import { HomePage } from './pages/HomePage';

export const App = () => (
  <main className="section">
    <div className="container">
      <Routes>
        <Route path="/" element={<LayoutRouter />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  </main>
);

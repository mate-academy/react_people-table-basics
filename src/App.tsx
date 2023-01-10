import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Page/HomePage';
import { PeoplePage } from './Page/PeoplePage';
import { NotFoundPage } from './Page/NotFoundPage';
import { BarNavigation } from './components/Navigation/BarNavigation';

export const App = () => {
  return (
    <div data-cy="app">
      <BarNavigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />

              <Route path=":selectedSlug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

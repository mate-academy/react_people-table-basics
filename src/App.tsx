import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage />
                )}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';
import { Navigation } from './components/Navigation';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <div className="block">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </main>
  </div>
);

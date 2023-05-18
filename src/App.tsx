import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { PageNotFound } from './components/NotFoundPage/NotFoundPage';
import { Navigation } from './navigation/navigation';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Routes>

      <Navigation />
    </main>
  </div>
);

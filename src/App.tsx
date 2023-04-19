import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { HomePage } from './pages/HomePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <div className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </div>
);

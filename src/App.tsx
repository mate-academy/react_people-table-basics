import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { PageContent } from './components/Page';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<PageContent />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personId" />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </div>
);

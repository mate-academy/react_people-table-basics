import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { PeoplePage } from './PeoplePage';

import './App.scss';
import { NotFound } from './NotFound';
import { HomePage } from './HomePage';
import { Layout } from './Layout';

export const App = () => (
  <div data-cy="app">

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="/people"
          element={<PeoplePage />}
        />
        <Route
          path="/people/:slug"
          element={<PeoplePage />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  </div>
);

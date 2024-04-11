import './App.scss';

import { Navigate, Route, Routes } from 'react-router-dom';

import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Layout } from './components/Layout';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":path" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

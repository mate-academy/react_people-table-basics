import { Route, Routes, Navigate } from 'react-router-dom';

import './App.scss';

// eslint-disable-next-line import/extensions
import { Home, People, NotFoundPage } from './pages';

import { Layout } from './components';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="people">
          <Route path=":slug?" element={<People />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

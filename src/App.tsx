import React from 'react';
import { Routes, Route } from 'react-router-dom';

import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

import { Layout } from 'components/Layout/Layout';
import { HomePage } from 'components/HomePage/HomePage';
import { PeoplePage } from 'components/PeoplePage/PeoplePage';
import { NotFoundPage } from 'components/NotFoundPage/NotFoundPage';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;

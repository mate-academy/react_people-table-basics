import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../HomePage/HomePage';
import { PeoplePage } from '../PeoplePage/PeoplePage';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

export const Main: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/people" element={<PeoplePage />} />

    <Route path="/*" element={<NotFoundPage />} />
  </Routes>
);

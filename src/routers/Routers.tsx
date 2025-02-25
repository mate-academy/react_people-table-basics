import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PersonsPage } from '../pages/PersonsPage';

export const Routers = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/people" element={<PersonsPage />}>
      <Route path=":slug" element={<PersonsPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

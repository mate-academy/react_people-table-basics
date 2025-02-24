import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage';
import { NotFoundPage } from '../Pages/NotFoundPage';
import { PersonsPage } from '../Pages/PersonsPage';

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

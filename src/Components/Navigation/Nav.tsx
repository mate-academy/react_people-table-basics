import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../HomePage';
import { PeoplePage } from '../PeoplePage';
import { NotFoundPage } from '../NotFoundPage';

export const Nav: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

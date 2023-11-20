import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { Person } from './types';
import { HomePage } from './HomePage';

interface AppRoutesProps {
  people: Person[];
  onSelectPerson: (slug: string) => void;
  getParent: (parentName: string | null) => Person | undefined;
}

export const AppRoutes: React.FC<AppRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="/people" element={<h1 className="title">People Page</h1>} />
      <Route
        path="/people/:slug"
        element={<h1 className="title">People Page</h1>}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

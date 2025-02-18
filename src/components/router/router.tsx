import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { People } from '../../pages/People';
import { NotFound } from '../../pages/NotFound';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/people" element={<People />}>
        <Route path=":personSlug" element={<People />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

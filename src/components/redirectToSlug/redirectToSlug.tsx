import { Navigate, useParams } from 'react-router-dom';
import React from 'react';

export const RedirectToPerson: React.FC = () => {
  const { slug } = useParams();

  return <Navigate to={`/person/${slug}`} replace />;
};

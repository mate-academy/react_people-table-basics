import { Navigate, useLocation } from 'react-router-dom';

export const NotFoundPage = () => {
  const location = useLocation();

  if (location.pathname === '/home') {
    return <Navigate to=".." replace />;
  }

  return (
    <h1 className="title">Page not found</h1>
  );
};

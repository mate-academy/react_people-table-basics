import { Navigate, useParams } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

export const HomePage = () => {
  const { home } = useParams();

  if (home === 'home') {
    return <Navigate to="/" replace={true} />;
  } else if (home) {
    return <NotFoundPage />;
  }

  return <h1 className="title">Home Page</h1>;
};

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const HomeRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {
      navigate('/');
    }
  }, [location, navigate]);

  return null;
};

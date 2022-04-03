import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Page not found';
  }, []);

  return (
    <div>
      Page not found. Go
      { }
      <Link to="/">Home</Link>
    </div>
  );
};

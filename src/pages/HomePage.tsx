import React, { useEffect } from 'react';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Home page';
  }, []);

  return (
    <div>This is home page</div>
  );
};

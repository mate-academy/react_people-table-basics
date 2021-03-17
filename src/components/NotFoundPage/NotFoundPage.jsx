import React, { useEffect } from 'react';

export const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page not found';
  });

  return (
    <h1>
      Page not found
    </h1>
  );
};

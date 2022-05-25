import React from 'react';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = React.memo(() => {
  return (
    <div className="notFound">
      <h2 className="notFound__title">Page not found</h2>
    </div>
  );
});

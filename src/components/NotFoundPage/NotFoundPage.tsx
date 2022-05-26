import React from 'react';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = React.memo(() => {
  return (
    <div className="NotFoundPage">
      <h2 className="NotFoundPage__title">Page not found</h2>
    </div>
  );
});

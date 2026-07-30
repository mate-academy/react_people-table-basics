import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  <div data-cy="loader" className="Loader">
    <div className="Loader__content" />
  </div>
);

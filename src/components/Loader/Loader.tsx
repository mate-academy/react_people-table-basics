import './Loader.scss';
import React, { memo } from 'react';

export const Loader: React.FC = memo(() => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
));

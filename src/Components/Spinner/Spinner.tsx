import React from 'react';
import './Spinner.scss';

export const Spinner: React.FC = () => (
  <div className="loading-container">
    <div className="spinner" />
    <div className="spinner-center" />
    <div className="loading-text">Loading...</div>
  </div>
);

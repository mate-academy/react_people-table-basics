import React from 'react';
import { NavLink } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <div className="p-8">
    <h1 className="title">404 — Page Not Found</h1>
    <p style={{ marginTop: 8 }}>
      <NavLink to="/">Go to Home</NavLink>
    </p>
  </div>
);

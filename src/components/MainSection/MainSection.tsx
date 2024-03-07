import React from 'react';
import { Outlet } from 'react-router-dom';

export const MainSection = React.memo(() => (
  <main className="section">
    <div className="container">
      <Outlet />
    </div>
  </main>
));

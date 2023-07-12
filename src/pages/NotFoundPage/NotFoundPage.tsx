import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';

export const NotFoundPage: React.FC = () => (
  <>
    <Navbar />

    <main className="section">
      <div className="container">
        <h1 className="title">Page not found</h1>
      </div>
    </main>
  </>
);

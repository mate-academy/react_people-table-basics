import React from 'react';
import { useHashRouter } from './hooks/useHashRouter';
import { HomePage } from './pages/HomePage';

import './App.scss';
import 'bulma/css/bulma.min.css';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
  const currentPath = useHashRouter();

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }

    if (currentPath === '/people') {
      return <PeoplePage selectedSlug={null} />;
    }

    if (currentPath.startsWith('/people/')) {
      const slug = currentPath.replace('/people/', '');

      return <PeoplePage selectedSlug={slug} />;
    }

    return <NotFoundPage />;
  };

  return (
    <div data-cy="app">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
      />
      <Navbar currentPath={currentPath} />

      <main className="section" style={{ marginTop: '52px' }}>
        <div className="container">{renderPage()}</div>
      </main>
    </div>
  );
};

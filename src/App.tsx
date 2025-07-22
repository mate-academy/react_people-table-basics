import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import { getPeople } from './api';
import { Person } from './types/Person';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PersonPage } from './pages/PersonPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
  };

  return (
    <HashRouter>
      <div data-cy="app">
        <Navbar />
        <main style={{ marginTop: '3rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={
                isLoading ? (
                  <Loader />
                ) : hasError ? (
                  <p className="has-text-danger" data-cy="peopleLoadingError">
                    Something went wrong
                  </p>
                ) : (
                  <PeoplePage
                    people={people}
                    selectedSlug={selectedSlug}
                    onSelect={handleSelect}
                  />
                )
              }
            />
            <Route
              path="/people/:slug"
              element={<PersonPage people={people} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

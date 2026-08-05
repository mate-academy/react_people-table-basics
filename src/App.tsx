import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { getPeople } from './api';
import { Person } from './types/Person';
import { NotFoundPage } from './components/Loader/NotFoundPage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { HomePage } from './components/Loader/HomePage';
import { Navbar } from './Navbar';

import './App.scss';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <HashRouter>
      <div data-cy="app">
        <Navbar />
        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />

              <Route path="/people">
                <Route
                  path=":slug?"
                  element={
                    <PeoplePage
                      people={people}
                      loading={loading}
                      errorMessage={errorMessage}
                    />
                  }
                />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

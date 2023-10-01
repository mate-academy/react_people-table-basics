import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { getPeople } from './api';
import { Person } from './types';
import { HeadOfTable } from './components/HeadOfTable/HeadOfTable';
import { Navigation } from './components/Naviagtion/Navigation';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';
import { PagenotFound } from './components/PagenotFound/PagenotFound';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  });

  return (
    <div data-cy="app">
      <HeadOfTable />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<HomePage />} />
              <Route
                path="*"
                element={<PagenotFound />}
              />
              <Route
                path="people"
                element={<PeoplePage people={people} setPeople={setPeople} />}
              >
                <Route
                  path=":personSlug"
                  element={<PeoplePage people={people} setPeople={setPeople} />}
                />
              </Route>
              <Route path="home" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

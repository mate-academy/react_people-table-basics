import './App.scss';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Person } from './types';
import { getPeople } from './api';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const findParent = (parentName: string | null) =>
    people.find(person => person.name === parentName);

  const peopleWithParents = people.map(person => ({
    ...person,
    father: findParent(person.fatherName),
    mother: findParent(person.motherName),
  }));

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to={'/'} replace />} />
            <Route path="people">
              <Route
                path=":slug?"
                element={
                  <PeoplePage
                    people={peopleWithParents}
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
  );
};

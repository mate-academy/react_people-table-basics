import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { NotFoundPage } from './NotFoundPage';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const Root = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="people"
            element={
              <PeoplePage
                people={people}
                loading={loading}
                errorMessage={errorMessage}
              />
            }
          >
            <Route
              path=":slug"
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
        </Route>
      </Routes>
      <App />
    </Router>
  );
};

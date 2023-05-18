import { useEffect, useState } from 'react';

import './App.scss';
import {
  Navigate, Route, Routes, useParams,
} from 'react-router-dom';
import { Person } from './types';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import { PeopleList } from './components/PeopleList';
import { Navigation } from './components/Navigation';

type Props = {
  people: Person[]
};

export const PeoplePage: React.FC<Props> = ({ people }) => {
  const { personSlug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleList
        people={people}
        selectedPerson={personSlug}
      />
    </>
  );
};

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPeopleData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const newPersonList = await getPeople();

      setPeople(newPersonList);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleData();
  }, []);

  return (
    <div data-cy="app">

      <Navigation />
      <main className="section">
        <div className="container">

          <div className="block">
            <div className="box table-container">
              {isLoading && <Loader />}
              {!isLoading && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!people.length && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && (
                <Routes>
                  <Route
                    path="/"
                    element={<h1 className="title">Home Page</h1>}
                  />
                  <Route path="home" element={<Navigate to="/" replace />} />

                  <Route path="people">
                    <Route
                      index
                      element={<PeoplePage people={people} />}
                    />

                    <Route
                      path=":personSlug"
                      element={<PeoplePage people={people} />}
                    />
                  </Route>

                  <Route
                    path="*"
                    element={<h1 className="title">Page not found</h1>}
                  />
                </Routes>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

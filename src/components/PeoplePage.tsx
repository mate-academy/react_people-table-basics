import React, { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadPeople() {
      setLoading(true);
      setError(false);
      setLoaded(false);

      try {
        const result = await getPeople();

        setPeople(result);
        setLoaded(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !error && loaded && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};

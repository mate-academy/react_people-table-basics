import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { People } from './PeopleTable';
import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setHasError(false);
    setLoading(true);

    (async () => {
      try {
        setPeople(await getPeople());
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    })();

    return () => setPeople([]);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && !hasError && !people.length && <Loader />}

          {!loading && hasError && !people.length && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !hasError && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!loading && !hasError && people.length
            && <People people={people} />}
        </div>
      </div>
    </>
  );
};

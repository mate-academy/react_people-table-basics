import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && (
        <>
          {people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <>
              <h1 className="title">People Page</h1>
              <PeopleTable people={people} />
            </>
          )}
        </>
      )}
    </>
  );
};

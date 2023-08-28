import { useEffect, useState } from 'react';
import { People } from '../components/People';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {!error && people !== null && people.length < 1
        && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!error && people.length > 0 && <People people={people} />}
    </>
  );
};

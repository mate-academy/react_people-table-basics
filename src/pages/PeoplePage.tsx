import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const canShowTable = useMemo(
    () => (!isLoading && !error && !!people.length),
    [isLoading, error, people],
  );

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(error && !isLoading) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong. Please try later!
            </p>
          )}

          {(!people.length && !isLoading && !error) && (
            <p data-cy="noPeopleMessage">
              Something went wrong. There are no people on the server!
            </p>
          )}

          {canShowTable && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};

import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <>
        {error ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                <PeopleTable people={people} />
              </>
            )}
          </>
        )}
      </>
    </>
  );
};

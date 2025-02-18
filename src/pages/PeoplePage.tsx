import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const canShowTable = useMemo(
    () => (!isLoading && !isError && !!people.length),
    [isLoading, isError, people],
  );

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !isLoading && !isError) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {canShowTable && (<PeopleTable people={people} />)}

        </div>
      </div>
    </>
  );
};

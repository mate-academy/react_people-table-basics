// #region imports
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
// #endregion

export const PeoplePage = () => {
  // #region hooks
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, []);
  // #endregion

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && !!people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    setIsLoadingError(false);
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoadingError && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !isLoading && !isLoadingError && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

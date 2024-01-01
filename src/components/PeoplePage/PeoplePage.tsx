import { useEffect, useState } from 'react';

import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const hasAbleRender = (!isLoading && !hasError && !!people.length);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !people.length && !hasError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {hasAbleRender && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
